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

  const devtoArticles = await fetchDevToArticles()

  // Map Dev.to fields to the shape the app expects
  const processedBlogs = devtoArticles.map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    brief: article.description || null,
    subtitle: null,
    content: { markdown: article.body_markdown || '' },
    coverImage: article.cover_image ? { url: article.cover_image } : null,
    publishedAt: article.published_at,
    tags: (article.tags || []).map((name) => ({ name })),
    views: article.page_views_count || 0,
    devtoUrl: article.url || null,
  }))

  const outputData = {
    blogs: processedBlogs,
    meta: {
      lastUpdated: new Date().toISOString(),
      totalBlogs: processedBlogs.length,
      devtoBlogs: devtoArticles.length,
    },
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // Save processed data
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(outputData, null, 2))

  console.log(`📝 Saved ${processedBlogs.length} processed blogs to ${OUTPUT_PATH}`)
  console.log(`✨ Blog data processing complete!`)
}

processAndSaveBlogData().catch((error) => {
  console.error('💥 Error processing blog data:', error)
  process.exit(1)
})
