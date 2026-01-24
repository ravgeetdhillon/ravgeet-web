const axiosConfig = {
  baseURL: 'https://gql.hashnode.com',
  headers: {
    'Content-Type': 'application/json',
  },
}

const HOST_NAME = 'ravgeetdhillon.hashnode.dev'
const BLOGS_PER_PAGE = 50

// Helper function to normalize strings for comparison
const normalizeString = (str) => {
  if (!str) return ''
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Helper function to match articles between platforms
const matchArticles = (hashnodeBlog, devtoArticles) => {
  if (!devtoArticles || !devtoArticles.length) return null

  // 1. Match by slug
  let match = devtoArticles.find(
    (article) => normalizeString(article.slug) === normalizeString(hashnodeBlog.slug)
  )
  if (match) return match

  // 2. Match by canonical URL
  if (hashnodeBlog.canonicalUrl) {
    match = devtoArticles.find((article) => article.canonical_url === hashnodeBlog.canonicalUrl)
    if (match) return match
  }

  // 3. Match by title
  const hashnodeTitle = normalizeString(hashnodeBlog.title)
  match = devtoArticles.find((article) => normalizeString(article.title) === hashnodeTitle)

  return match
}

const BlogsAPI = ({ $axios, error }) => {
  // Load cached Dev.to articles from pre-generated file
  const findDevToArticles = () => {
    try {
      const fs = require('fs')
      const path = require('path')
      const filePath = path.join(process.cwd(), '.temp', 'devto-articles.json')

      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8')
        const articles = JSON.parse(data)
        console.log(`📖 Loaded ${articles.length} Dev.to articles from cache`)
        return articles
      } else {
        console.warn('⚠️  Dev.to articles cache file not found, skipping Dev.to view counts')
        return []
      }
    } catch (err) {
      console.error('Error loading Dev.to articles from cache:', err.message)
      return []
    }
  }

  return {
    find: async ({ pageSize = BLOGS_PER_PAGE, lastPostId = '' }) => {
      const data = () =>
        JSON.stringify({
          query: `
          query GetUserBlogs($lastPostId: String!) {
            publication(host: "${HOST_NAME}") {
              posts(first:${pageSize}, after: $lastPostId) {
                totalDocuments
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    id
                    cuid
                    slug
                    title
                    brief
                    subtitle
                    content {
                      markdown
                    }
                    coverImage {
                      url
                    }
                    publishedAt
                    tags {
                      name
                    }
                  }
                }
              }
            }
          }`,
          variables: { lastPostId },
        })

      try {
        // Fetch Hashnode blogs
        const res = await $axios.create(axiosConfig).$post('/', data(lastPostId))
        const hashnodeBlogs = res.data.publication.posts.edges.map((edge) => edge.node)
        const totalBlogs = res.data.publication.posts.totalDocuments
        const { hasNextPage, endCursor } = res.data.publication.posts.pageInfo

        // Load Dev.to articles from pre-generated cache
        const devtoArticles = findDevToArticles()

        // Combine view counts
        const blogs = hashnodeBlogs.map((blog) => {
          const devtoMatch = matchArticles(blog, devtoArticles)
          const hashnodeViews = blog.views || 0
          const devtoViews = devtoMatch?.page_views_count || 0
          const combinedViews = hashnodeViews + devtoViews

          return {
            ...blog,
            views: combinedViews,
            hashnodeViews,
            devtoViews,
          }
        })

        return { blogs, totalBlogs, hasNextPage, endCursor }
      } catch (err) {
        return { blogs: [], totalBlogs: 0, hasNextPage: false, endCursor: '', error: err.message }
      }
    },

    findOne: async ({ slug }) => {
      const data = (slug) =>
        JSON.stringify({
          query: `
          query GetBlog($slug: String!) {
            publication(host: "${HOST_NAME}") {
              post(slug: $slug) {
                id
                cuid
                views
                slug
                title
                brief
                subtitle
                content {
                  markdown
                }
                coverImage {
                  url
                }
                publishedAt
                tags {
                  name
                }
              }
            }
          }`,
          variables: { slug },
        })

      const res = await $axios.create(axiosConfig).$post('/', data(slug))
      const blog = res.data.publication.post

      if (!blog) {
        error({ statusCode: 404, message: 'This page could not be found' })
      }

      // Load Dev.to articles from pre-generated cache to get matching article's view count
      const devtoArticles = findDevToArticles()
      const devtoMatch = matchArticles(blog, devtoArticles)
      const hashnodeViews = blog.views || 0
      const devtoViews = devtoMatch?.page_views_count || 0
      const combinedViews = hashnodeViews + devtoViews

      return {
        ...blog,
        views: combinedViews,
        hashnodeViews,
        devtoViews,
      }
    },
  }
}

export { BlogsAPI }
