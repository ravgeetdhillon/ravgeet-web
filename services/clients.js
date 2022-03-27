import { addNuxtId } from '~/utils/id'

const ClientsAPI = ($content, error) => ({
  find: async () => {
    const clients = await $content('clients').fetch()
    return addNuxtId(clients)
  },

  findOne: async ({ slug }) => {
    const client = await $content('clients', slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return addNuxtId(client)
  },
})

export { ClientsAPI }
