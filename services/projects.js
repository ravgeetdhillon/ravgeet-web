const ProjectsAPI = ($content, error) => ({
  find: async () => {
    const projects = await $content('projects').fetch()
    return projects
  },

  findOne: async ({ slug }) => {
    const project = await $content('projects', slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return project
  },
})

export { ProjectsAPI }
