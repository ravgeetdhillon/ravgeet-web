import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { marked } from 'marked'
import VueGtag from 'vue-gtag'
import classNames from 'classnames'
import { BlogsAPI } from '~/services/blogs'
import { ProjectsAPI } from '~/services/projects'
import { ClientsAPI } from '~/services/clients'
import { ServicesAPI } from '~/services/services'

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

const formatDateTime = (value) => {
  if (value) {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'long',
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
    formatDateTime,
  },
})

Vue.filter('markdownify', markdownify)
Vue.filter('cx', cx)
Vue.filter('conjuction', conjuction)
Vue.filter('formatDate', formatDate)
Vue.filter('formatDateTime', formatDateTime)

export default (ctx, inject) => {
  const { $axios, $content, error, $config } = ctx

  const services = {
    blogs: BlogsAPI($axios, error),
    projects: ProjectsAPI($content, error),
    clients: ClientsAPI($content, error),
    services: ServicesAPI($content, error),
    dribbble: DribbbleAPI($axios, error, $config),
  }

  inject('services', services)
}
