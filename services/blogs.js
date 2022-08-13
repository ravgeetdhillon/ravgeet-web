import { addNuxtId } from '~/utils/id'

const axiosConfig = {
  baseURL: 'https://api.hashnode.com',
  headers: {
    'Content-Type': 'application/json',
  },
}

const BlogsAPI = ($axios, error) => ({
  find: async () => {
    const data = (page) =>
      JSON.stringify({
        query: `query GetUserBlogs($page: Int!) {
          user(username: "ravgeetdhillon") {
            publication {
              posts(page: $page) {
                slug
                title
                brief
                contentMarkdown
                coverImage
                isActive
                dateAdded
              }
            }
          }
        }`,
        variables: { page },
      })

    let blogs = []
    let page = 0

    while (true) {
      const res = await $axios.create(axiosConfig).$post('/', data(page))

      const postsOnNewPage = res.data.user.publication.posts.filter(
        (post) => post.isActive === true
      )

      if (postsOnNewPage.length === 0) {
        break
      }

      blogs = [...blogs, ...postsOnNewPage]
      page = page + 1
    }

    return addNuxtId(blogs)
  },

  findByPage: async ({ page }) => {
    const data = (page) =>
      JSON.stringify({
        query: `query GetUserBlogs($page: Int!) {
          user(username: "ravgeetdhillon") {
            publication {
              posts(page: $page) {
                slug
                title
                brief
                contentMarkdown
                coverImage
                isActive
                dateAdded
              }
            }
          }
        }`,
        variables: { page },
      })

    try {
      const res = await $axios.create(axiosConfig).$post('/', data(page - 1)) // subtract -1 since hashnode api uses zero-based indexing
      const blogs = res.data.user.publication.posts.filter((post) => post.isActive === true)
      if (blogs.length === 0) {
        error({ statusCode: 404, message: 'This page could not be found' })
      }
      return addNuxtId(blogs)
    } catch (err) {
      error({ statusCode: err.statuscode, message: err.message })
    }
  },

  findOne: async ({ slug }) => {
    const data = (slug) =>
      JSON.stringify({
        query: `query GetBlog($slug: String!) {
          post(slug: $slug, hostname:"https://hashnode.com/@ravgeetdhillon") {
            slug
            title
            brief
            contentMarkdown
            coverImage
            isActive
            dateAdded
          }
        }`,
        variables: { slug },
      })

    const res = await $axios.create(axiosConfig).$post('/', data(slug))
    const blog = res.data.post

    if (!blog) {
      error({ statusCode: 404, message: 'This page could not be found' })
    }

    return addNuxtId(blog)
  },
})

export { BlogsAPI }
