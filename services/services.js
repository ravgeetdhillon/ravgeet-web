const ServicesAPI = ($content, error) => ({
  find: async () => {
    const services = await $content('services').fetch()
    return services
  },

  findOne: async ({ slug }) => {
    const service = await $content('services', slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return service
  },
})

export { ServicesAPI }
