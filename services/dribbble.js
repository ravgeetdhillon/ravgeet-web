import { addNuxtId } from '~/utils/id'

const axiosConfig = {
  baseURL: 'https://api.dribbble.com/v2',
  headers: {
    'Content-Type': 'application/json',
  },
}

const DribbbleAPI = ({ $axios, error, $config }) => ({
  find: async () => {
    try {
      const res = await $axios
        .create(axiosConfig)
        .$get(`/user/shots?access_token=${$config.dribbbleApiAccessToken}&per_page=100`)
      const posts = res
      return addNuxtId(posts)
    } catch (err) {
      error({ statusCode: err.statusCode, message: err.message })
    }
  },
})

export { DribbbleAPI }
