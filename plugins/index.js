import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { marked } from 'marked'
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
import { DribbbleAPI } from '~/services/dribbble'

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

const formatDate = (value, format = 'D MMMM, YYYY') => {
  if (value) {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.extend(relativeTime)
    return dayjs(value).tz(dayjs.tz.guess()).format(format)
  }
}

const formatDateTime = (value) => formatDate(value, 'D MMMM, YYYY - hh:mm A')

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
  const services = {
    blogs: BlogsAPI(ctx),
    projects: ProjectsAPI(ctx),
    clients: ClientsAPI(ctx),
    services: ServicesAPI(ctx),
    dribbble: DribbbleAPI(ctx),
  }

  inject('services', services)
}
