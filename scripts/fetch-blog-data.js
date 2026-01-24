#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const axios = require('axios')

// Load environment variables
require('dotenv').config()

const DEVTO_API_TOKEN = process.env.DEVTO_API_TOKEN
const OUTPUT_DIR = path.join(process.cwd(), 'static')
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'blogs.json')

// Hashnode configuration
const HASHNODE_HOST = 'ravgeetdhillon.hashnode.dev'
const HASHNODE_API_URL = 'https://gql.hashnode.com'

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

async function fetchHashnodeBlogs() {
  console.log('📚 Fetching Hashnode blogs...')

  let allBlogs = []
  let hasNextPage = true
  let endCursor = ''

  while (hasNextPage) {
    const query = `
      query GetBlogs($endCursor: String) {
        publication(host: "${HASHNODE_HOST}") {
          posts(first: 50, after: $endCursor) {
            totalDocuments
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
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
          }
        }
      }
    `

    try {
      const response = await axios.post(
        HASHNODE_API_URL,
        {
          query,
          variables: { endCursor: endCursor || null },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.data.errors) {
        console.error('❌ Hashnode GraphQL errors:', response.data.errors)
        break
      }

      const batchBlogs = response.data.data.publication.posts.edges.map((edge) => edge.node)
      allBlogs = [...allBlogs, ...batchBlogs]

      const pageInfo = response.data.data.publication.posts.pageInfo
      hasNextPage = pageInfo.hasNextPage
      endCursor = pageInfo.endCursor

      console.log(`📄 Fetched ${batchBlogs.length} blogs (total: ${allBlogs.length})`)

      // Small delay to avoid overwhelming the API
      if (hasNextPage) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    } catch (error) {
      console.error('❌ Error fetching Hashnode blogs:', error.message)
      if (error.response) {
        console.error('Response data:', error.response.data)
      }
      break
    }
  }

  console.log(`✅ Fetched ${allBlogs.length} total Hashnode blogs`)
  return allBlogs
}

async function fetchDevToArticles() {
  console.log('🚀 Fetching Dev.to articles...')

  if (!DEVTO_API_TOKEN) {
    console.warn('⚠️  DEVTO_API_TOKEN not found, skipping Dev.to data')
    return []
  }

  try {
    const response = await axios.get('https://dev.to/api/articles/me?per_page=1000', {
      headers: {
        'api-key': DEVTO_API_TOKEN,
        'User-Agent': 'RavgeetWeb/1.0',
        'Content-Type': 'application/json',
      },
    })

    const articles = response.data || []
    console.log(`✅ Fetched ${articles.length} Dev.to articles`)
    return articles
  } catch (error) {
    console.error('❌ Error fetching Dev.to articles:', error.message)

    if (error.response && error.response.status === 429) {
      console.warn('⏰ Rate limit hit, continuing without Dev.to data')
    }

    return []
  }
}

async function processAndSaveBlogData() {
  console.log('🔄 Processing blog data...')

  // Fetch data from both platforms
  const [hashnodeBlogs, devtoArticles] = await Promise.all([
    fetchHashnodeBlogs(),
    fetchDevToArticles(),
  ])

  // Process and combine view counts
  const processedBlogs = hashnodeBlogs.map((blog) => {
    const devtoMatch = matchArticles(blog, devtoArticles)
    const hashnodeViews = blog.views || 0
    const devtoViews = devtoMatch?.page_views_count || 0
    const combinedViews = hashnodeViews + devtoViews

    return {
      ...blog,
      views: combinedViews,
      hashnodeViews,
      devtoViews,
      devtoUrl: devtoMatch?.url || null,
    }
  })

  // Create output data structure
  const outputData = {
    blogs: processedBlogs,
    meta: {
      lastUpdated: new Date().toISOString(),
      totalBlogs: processedBlogs.length,
      hashnodeBlogs: hashnodeBlogs.length,
      devtoArticles: devtoArticles.length,
      matchedArticles: processedBlogs.filter((blog) => blog.devtoViews > 0).length,
    },
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // Save processed data
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(outputData, null, 2))

  console.log(`📝 Saved ${processedBlogs.length} processed blogs to ${OUTPUT_PATH}`)
  console.log(
    `📊 Combined views: ${
      processedBlogs.filter((b) => b.devtoViews > 0).length
    } articles matched with Dev.to`
  )
  console.log(`✨ Blog data processing complete!`)
}

processAndSaveBlogData().catch((error) => {
  console.error('💥 Error processing blog data:', error)
  process.exit(1)
})
