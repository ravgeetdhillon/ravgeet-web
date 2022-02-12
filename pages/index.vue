<template>
  <div class="row w-lg-75 mx-lg-auto">
    <div class="col-12">
      <div class="row align-items-start flex-row-reverse">
        <div class="col-4 overflow-hidden">
          <img
            src="/images/icons/logos/ravgeet-dhillon.jpg"
            class="img-fluid rounded"
          />
        </div>

        <div class="col-8 pr-4">
          <nuxt-content class="markdown-body" :document="pageContent" />
        </div>
      </div>
    </div>

    <!-- <div class="col-12 mb-5">
      <div class="d-flex align-items-center mb-2">
        <h2 class="font-weight-bold mb-0 mr-3">
          {{ clientsSection.heading }}
        </h2>
        <nuxt-link to="/clients" class="btn btn-sm btn-theme-white">
          All <b-icon-arrow-right-short />
        </nuxt-link>
      </div>
      <div
        class="text-muted"
        v-html="markdownify(clientsSection.description)"
      />
      <div class="row">
        <div
          v-for="(client, clientIndex) in clients"
          :key="clientIndex"
          class="col-md-3 col-6 mb-4"
        >
          <Client :client="client" />
        </div>
      </div>
    </div> -->

    <!-- <div class="col-12 mb-5">
      <div class="d-flex align-items-center mb-2">
        <h2 class="font-weight-bold mb-0 mr-3">
          {{ projectsSection.heading }}
        </h2>
        <NuxtLink to="/projects" class="btn btn-sm btn-theme-white">
          All <b-icon-arrow-right-short />
        </NuxtLink>
      </div>
      <div
        class="text-muted"
        v-html="markdownify(projectsSection.description)"
      />
      <div class="row">
        <div
          v-for="(project, projectIndex) in projects"
          :key="projectIndex"
          class="col-md-6 mb-4"
        >
          <Project :project="project" />
        </div>
      </div>
    </div> -->

    <!-- <div class="col-12 mb-5">
      <div class="d-flex align-items-center mb-2">
        <h2 class="font-weight-bold mb-0 mr-3">
          {{ servicesSection.heading }}
        </h2>
        <nuxt-link to="/services" class="btn btn-sm btn-theme-white">
          All <b-icon-arrow-right-short />
        </nuxt-link>
      </div>
      <div
        class="text-muted"
        v-html="markdownify(servicesSection.description)"
      />
      <div class="row">
        <div
          v-for="(service, serviceIndex) in services"
          :key="serviceIndex"
          class="col-md-6 mb-4"
        >
          <Service :service="service" />
        </div>
      </div>
    </div> -->

    <!-- <div class="col-12 mb-5">
      <div class="d-flex align-items-center mb-2">
        <h2 class="font-weight-bold mb-0 mr-3">
          {{ blogsSection.heading }}
        </h2>
        <nuxt-link to="/blogs" class="btn btn-sm btn-theme-white">
          All <b-icon-arrow-right-short />
        </nuxt-link>
      </div>
      <div class="text-muted" v-html="markdownify(blogsSection.description)" />
      <div class="row">
        <div
          v-for="(blog, blogIndex) in blogs"
          :key="blogIndex"
          class="col-12 mb-4"
        >
          <Blog :blog="blog" />
        </div>
      </div>
    </div> -->

    <!-- <div class="col-12">
      <newsletter />
    </div> -->
  </div>
</template>

<script>
import { shuffle } from 'lodash'

export default {
  async asyncData({ $content }) {
    const pageContent = await $content('extra', 'index').fetch()

    let clients = await $content('clients').fetch()
    clients = shuffle(clients).slice(0, 4)

    let projects = await $content('projects').fetch()
    projects = shuffle(projects).slice(0, 4)

    let services = await $content('services').fetch()
    services = shuffle(services).slice(0, 4)

    return { pageContent, clients, projects, services }
  },

  data() {
    return {
      title:
        'Full Stack Developer, Flutter Developer, Technical Content Writer - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India.',
      clientsSection: {
        heading: 'Clients',
        description:
          "Here are some of the companies and startups I've worked with",
      },
      projectsSection: {
        heading: 'Projects',
        description: "Here are some of the projects that I'm really proud of",
      },
      servicesSection: {
        heading: 'Services',
        description: 'Here are some of the services that I provide',
      },
      blogsSection: {
        heading: 'Blogs',
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
