const ClientsAPI = ($content, error) => ({
  find: async () => {
    const clients = await $content('clients').fetch()
    return clients
  },

  findOne: async ({ slug }) => {
    const client = await $content('clients', slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return client
  },
})

export { ClientsAPI }
