#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const axios = require('axios')

// Load environment variables
require('dotenv').config()

const DEVTO_API_TOKEN = process.env.DEVTO_API_TOKEN
const OUTPUT_PATH = path.join(process.cwd(), '.temp', 'devto-articles.json')

async function fetchDevToArticles() {
  console.log('🚀 Fetching Dev.to articles...')

  if (!DEVTO_API_TOKEN) {
    console.warn('⚠️  DEVTO_API_TOKEN not found, skipping Dev.to data fetch')
    // Create empty file to prevent errors
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([]))
    return
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

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })

    // Write articles to temp file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(articles, null, 2))
    console.log(`📝 Saved articles to ${OUTPUT_PATH}`)
  } catch (error) {
    console.error('❌ Error fetching Dev.to articles:', error.message)

    if (error.response && error.response.status === 429) {
      console.warn('⏰ Rate limit hit, creating empty file to continue build')
    }

    // Create empty file so build doesn't fail
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([]))
  }
}

fetchDevToArticles()
