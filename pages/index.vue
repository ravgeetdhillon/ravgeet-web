<template>
  <div class="row w-lg-75 mx-lg-auto">
    <div class="col-12 mb-5">
      <div class="row align-items-start flex-row-reverse">
        <div class="col-12 overflow-hidden">
          <img
            src="/images/icons/logos/ravgeet-dhillon.jpg"
            class="img-fluid rounded mb-4"
            style="max-width: 12rem"
          />
        </div>
        <div class="col-12 pr-4">
          <nuxt-content class="markdown-body" :document="pageContent" />
        </div>
      </div>
    </div>

    <!-- <div class="col-12 mb-5">
      <heading :title="clientsSection.heading" to="/clients" />
      <div class="row">
        <div
          v-for="(client, clientIndex) in clients"
          :key="clientIndex"
          class="col-md-3 col-6 mb-4"
        >
          <client :client="client" />
        </div>
      </div>
    </div> -->

    <div class="col-12 mb-5">
      <heading :title="projectsSection.heading" to="/projects" />
      <div class="row">
        <div v-for="(project, projectIndex) in projects" :key="projectIndex" class="col-md-6 mb-4">
          <project-card :project="project" />
        </div>
      </div>
    </div>

    <!-- <div class="col-12 mb-5">
      <heading :title="servicesSection.heading" to="/services" />
      <div class="row">
        <div v-for="(service, serviceIndex) in services" :key="serviceIndex" class="col-md-6 mb-4">
          <service :service="service" />
        </div>
      </div>
    </div> -->

    <div class="col-12 mb-5">
      <heading :title="blogsSection.heading" to="/blog" />
      <div class="row">
        <div
          v-for="(blog, blogIndex) in blogs"
          :key="blogIndex"
          :class="cx('col-12', { 'mb-4': blogIndex !== blogs.length - 1 })"
        >
          <blog-brief :blog="blog" :show-date="false" :has-heading="false" />
        </div>
      </div>
    </div>

    <div class="col-12">
      <newsletter />
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'

export default {
  async asyncData({ $content, $services }) {
    const pageContent = await $content('extra', 'index').fetch()

    let clients = await $services.clients.find()
    clients = shuffle(clients).slice(0, 4)

    let projects = await $services.projects.find()
    projects = shuffle(projects).slice(0, 4)

    let services = await $services.services.find()
    services = shuffle(services).slice(0, 4)

    let blogs = await $services.articles.find()
    blogs = blogs.slice(0, 5)

    return { pageContent, clients, projects, services, blogs }
  },

  data() {
    return {
      title: 'Full Stack Developer, Flutter Developer, Technical Content Writer - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India.',
      clientsSection: {
        heading: '🤝 Clients',
        description: "Here are some of the companies and startups I've worked with",
      },
      projectsSection: {
        heading: '🏗 Projects',
        description: "Here are some of the projects that I'm really proud of",
      },
      servicesSection: {
        heading: '🛠 Services',
        description: 'Here are some of the services that I provide',
      },
      blogsSection: {
        heading: '✍️ Blogs',
        description: 'Here are some of the services that I provide',
      },
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
}
</script>
