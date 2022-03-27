import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { marked } from 'marked'
import VueGtag from 'vue-gtag'
import classNames from 'classnames'

const markdownify = (value) => {
  if (value) {
    value = value.replace(/%\[(.*?)\]/gm, '') // remove hashnode specific markdown for links
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

const formatDate = (value) => {
  if (value) {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
    }).format(new Date(value))
  }
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
  },
})

Vue.filter('markdownify', markdownify)
Vue.filter('cx', cx)
Vue.filter('conjuction', conjuction)
Vue.filter('formatDate', formatDate)
