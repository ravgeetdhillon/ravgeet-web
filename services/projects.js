import { addNuxtId } from '~/utils/id'

const ProjectsAPI = ($content, error) => ({
  find: async () => {
    const projects = await $content('projects').fetch()
    return addNuxtId(projects)
  },

  findOne: async ({ slug }) => {
    const project = await $content('projects', slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'This page could not be found' })
      })
    return addNuxtId(project)
  },
})

export { ProjectsAPI }
