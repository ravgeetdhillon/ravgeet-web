import { addNuxtId } from '~/utils/id'

const ServicesAPI = ({ $content, error }) => ({
  find: async () => {
    const services = await $content('services').fetch()
    return addNuxtId(services)
  },

  findOne: async ({ slug }) => {
    const service = await $content('services', slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'This page could not be found' })
      })
    return addNuxtId(service)
  },
})

export { ServicesAPI }
