const axiosConfig = {
  baseURL: 'https://gql.hashnode.com',
  headers: {
    'Content-Type': 'application/json',
  },
}

const HOST_NAME = 'ravgeetdhillon.hashnode.dev'
const BLOGS_PER_PAGE = 50

const BlogsAPI = ({ $axios, error }) => ({
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
      const res = await $axios.create(axiosConfig).$post('/', data(lastPostId))
      const blogs = res.data.publication.posts.edges.map((edge) => edge.node)
      const totalBlogs = res.data.publication.posts.totalDocuments
      const { hasNextPage, endCursor } = res.data.publication.posts.pageInfo
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

    return blog
  },
})

export { BlogsAPI }
