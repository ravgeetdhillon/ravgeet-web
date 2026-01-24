const BlogsAPI = ({ error }) => {
  // Load blog data using dynamic import (Nuxt.js best practice)
  const loadBlogData = async () => {
    try {
      const data = await import('@/static/blogs.json')
      const blogData = data.default || data
      return blogData
    } catch (err) {
      console.error('Error loading blog data:', err.message)
      return { blogs: [], meta: { totalBlogs: 0 } }
    }
  }

  return {
    find: async ({ pageSize = undefined }) => {
      try {
        const { blogs, meta } = await loadBlogData()
        const selectedBlogs = pageSize ? blogs.slice(0, pageSize) : blogs

        return {
          blogs: selectedBlogs,
          totalBlogs: meta.totalBlogs,
          error: null,
        }
      } catch (err) {
        return {
          blogs: [],
          totalBlogs: 0,
          error: err.message,
        }
      }
    },

    findOne: async ({ slug }) => {
      try {
        const { blogs } = await loadBlogData()
        const blog = blogs.find((b) => b.slug === slug)

        if (!blog) {
          error({ statusCode: 404, message: 'This page could not be found' })
        }

        return blog
      } catch (err) {
        error({ statusCode: 500, message: 'Error loading blog data' })
      }
    },
  }
}

export { BlogsAPI }
