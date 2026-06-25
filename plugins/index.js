import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-graphql'
import VueGtag from 'vue-gtag'
import classNames from 'classnames'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import { BlogsAPI } from '~/services/blogs'
import { ProjectsAPI } from '~/services/projects'
import { ClientsAPI } from '~/services/clients'
import { ServicesAPI } from '~/services/services'

// Configure marked to use Prism for syntax highlighting
const renderer = new marked.Renderer()
renderer.code = (code, language) => {
  const lang = language && Prism.languages[language] ? language : 'plaintext'
  const highlighted =
    lang !== 'plaintext' ? Prism.highlight(code, Prism.languages[lang], lang) : code
  return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`
}
marked.setOptions({ renderer })

const markdownify = (value) => {
  if (value) {
    // Replace Dev.to YouTube embed liquid tags with responsive iframes
    // Handles {% embed https://youtu.be/ID %} and {% embed https://youtube.com/watch?v=ID %}
    value = value.replace(
      /\{%\s*embed\s+(https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)[^\s]*)\s*%\}/gm,
      (_, _url, videoId) =>
        `<div class="embed-responsive embed-responsive-16by9">` +
        `<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${videoId}" ` +
        `allowfullscreen loading="lazy"></iframe></div>`
    )

    // Replace any remaining Dev.to liquid embed tags with a plain link
    value = value.replace(
      /\{%\s*embed\s+(https?:\/\/[^\s%]+)\s*%\}/gm,
      (_, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    )

    // Remove other Dev.to/Hashnode specific liquid tags
    value = value.replace(/%\[(.*?)\]/gm, '')

    // Fix Hashnode image syntax - remove align attributes from image markdown
    value = value.replace(/!\[\]\((.*?)\s+align=".*?"\)/gm, '![]($1)')

    // Also handle images with alt text
    value = value.replace(/!\[(.*?)\]\((.*?)\s+align=".*?"\)/gm, '![$1]($2)')

    return marked.parse(value)
  }
}

const cx = (...args) => classNames(...args)

const conjuction = (value) => {
  if (value) {
    return new Intl.ListFormat('en', {
      style: 'long',
      type: 'conjunction',
    }).format(value)
  }
}

const formatDate = (value, format = 'D MMMM, YYYY') => {
  if (value) {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.extend(relativeTime)
    return dayjs(value).tz(dayjs.tz.guess()).format(format)
  }
}

const formatDateTime = (value) => formatDate(value, 'D MMMM, YYYY - hh:mm A')

// Round views to next 1000 value
const roundViews = (value) => {
  const roundUpto = 5
  const rounded = Math.ceil(value / roundUpto) * roundUpto
  return '~' + rounded.toString()
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueGtag, {
  config: {
    id: process.env.NODE_ENV === 'production' ? 'G-5P5CKH4GH2' : 'G-XXXXXXXXXX',
    enabled: process.env.NODE_ENV === 'production',
  },
})

Vue.mixin({
  methods: {
    markdownify,
    cx,
    conjuction,
    formatDate,
    formatDateTime,
    roundViews,
  },
})

Vue.filter('markdownify', markdownify)
Vue.filter('cx', cx)
Vue.filter('conjuction', conjuction)
Vue.filter('formatDate', formatDate)
Vue.filter('formatDateTime', formatDateTime)

export default (ctx, inject) => {
  const services = {
    blogs: BlogsAPI(ctx),
    projects: ProjectsAPI(ctx),
    clients: ClientsAPI(ctx),
    services: ServicesAPI(ctx),
  }

  inject('services', services)
}
