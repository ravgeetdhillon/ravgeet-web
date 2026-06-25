import fs from 'fs'

let appLastUpdatedAt = new Date()
try {
  appLastUpdatedAt = fs.readFileSync('./.last-updated-at', 'utf8')
} catch (err) {}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  loadingIndicator: {
    name: 'pulse',
    color: '#f5f5f521',
    background: '#ffffff',
  },

  // Loading progress bar component that's shown between routes
  loading: {
    color: '#ce4611',
    failedColor: '#fb9193',
    height: '0.125rem',
    throttle: 0, // wait for the specified time before displaying the progress bar.
  },

  generate: { fallback: '404.html' },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ravgeet Dhillon - Full Stack Developer and Technical Content Writer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no',
      },
      { name: 'author', content: 'Ravgeet Dhillon' },
      {
        name: 'description',
        content:
          'Ravgeet Dhillon is a full time Full Stack Developer and Technical Content Writer working remotely and based in India.',
      },
      { name: 'generator', content: 'Nuxt.js' },
      { name: 'robots', content: 'all' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Ravgeet Dhillon is a full time Full Stack Developer and Technical Content Writer working remotely and based in India.',
      },
      { hid: 'og:title', name: 'og:title', content: 'Ravgeet Dhillon' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Ravgeet Dhillon' },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'Ravgeet Dhillon',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: "Ravgeet Dhillon's Blog RSS Feed",
        href: '/feed.xml',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/index.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa', '@/modules/sitemapRouteGenerator'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap', // always declare sitemap at the end of the array
    '@nuxtjs/feed',
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  // use these settings to use custom css
  bootstrapVue: {
    bootstrapCSS: false,
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  content: {},

  robots: {
    UserAgent: '*',
    Sitemap: 'https://www.ravgeet.in/sitemap.xml',
  },

  sitemap: {
    hostname: 'https://www.ravgeet.in',
    gzip: true,
    exclude: [],
  },

  feed: [
    {
      path: '/feed.xml',
      type: 'rss2',
      create: async (feed) => {
        feed.options = {
          title: "Ravgeet Dhillon's Blog",
          link: 'https://www.ravgeet.in',
          description:
            'Full Stack Developer and Technical Content Writer - sharing insights on web development, programming, and technology.',
          language: 'en',
          ttl: 60,
          generator: 'Nuxt.js Feed Module',
          feedLinks: {
            rss: 'https://www.ravgeet.in/feed.xml',
          },
        }

        // Import axios and fetch blog posts from Dev.to
        const axios = require('axios')
        const devtoApiToken = process.env.DEVTO_API_TOKEN

        try {
          const response = await axios.get('https://dev.to/api/articles/me?per_page=1000', {
            headers: {
              'api-key': devtoApiToken,
              'User-Agent': 'RavgeetWeb/1.0',
              'Content-Type': 'application/json',
            },
          })
          const posts = response.data || []

          posts.forEach((post) => {
            const postUrl = `https://www.ravgeet.in/blog/${post.slug}`
            const cleanContent = post.body_markdown
              ? post.body_markdown.replace(
                  /&(?![a-zA-Z][a-zA-Z0-9]*;|#[0-9]+;|#x[0-9a-fA-F]+;)/g,
                  '&amp;'
                )
              : ''

            feed.addItem({
              title: post.title,
              id: postUrl,
              guid: postUrl,
              link: postUrl,
              description: post.description || '',
              content: cleanContent,
              author: [
                {
                  name: 'Ravgeet Dhillon',
                  link: 'https://www.ravgeet.in',
                },
              ],
              date: new Date(post.published_at),
              image: post.cover_image || undefined,
              category: (post.tags || []).map((name) => ({ name })),
            })
          })
        } catch (error) {
          // Silently handle errors - RSS feed will be empty if blog posts can't be fetched
          // eslint-disable-next-line no-console
          console.error(error)
        }

        feed.addCategory('Web Development')
        feed.addCategory('Programming')
        feed.addCategory('Technology')
        feed.addCategory('AI')

        feed.addContributor({
          name: 'Ravgeet Dhillon',
          email: 'ravgeetdhillon@gmail.com',
          link: 'https://www.ravgeet.in',
        })

        return feed
      },
    },
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: { layouts: true },
    loaders: {
      vue: {
        prettify: false,
      },
    },
  },

  publicRuntimeConfig: {
    appLastUpdatedAt,
    site: {
      author: 'Ravgeet Dhillon',
      repo: 'https://github.com/ravgeetdhillon/ravgeet-web',
      newsletter: 'https://www.ravsam.in/newsletter/',
    },
  },

  privateRuntimeConfig: {},
}
