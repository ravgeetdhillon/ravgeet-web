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
          v-for="client in clients"
          :key="client.nid"
          class="col-md-3 col-6 mb-4"
        >
          <client :client="client" />
        </div>
      </div>
    </div> -->

    <div class="col-12 mb-5">
      <heading :title="projectsSection.heading" to="/projects" />
      <div class="row">
        <div v-for="project in projects" :key="project.nid" class="col-md-6 mb-4">
          <project-card :project="project" />
        </div>
      </div>
    </div>

    <div class="col-12 mb-5">
      <heading :title="designSection.heading" to="/design" />
      <div class="row">
        <div v-for="designPost in designPosts" :key="designPost.nid" class="col-md-6 mb-4">
          <dribbble-card :post="designPost" />
        </div>
      </div>
    </div>

    <div class="col-12 mb-5">
      <heading :title="servicesSection.heading" to="/services" />
      <div class="row">
        <div
          v-for="(service, serviceIndex) in services"
          :key="service.nid"
          :class="cx('col-12', { 'mb-4': serviceIndex !== services.length - 1 })"
        >
          <service-brief :service="service" :show-date="false" :has-heading="false" />
        </div>
      </div>
    </div>

    <div class="col-12 mb-5">
      <heading :title="blogsSection.heading" to="/blog" />
      <div class="row">
        <div
          v-for="(blog, blogIndex) in blogs"
          :key="blog.nid"
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

    let designPosts = await $services.dribbble.find()
    designPosts = shuffle(designPosts).slice(0, 4)

    let projects = await $services.projects.find()
    projects = shuffle(projects).slice(0, 4)

    let services = await $services.services.find()
    services = shuffle(services).slice(0, 4)

    const blogs = await $services.blogs.findByPage({ page: 1 })

    return { pageContent, clients, designPosts, projects, services, blogs }
  },

  data() {
    return {
      title: 'Full Stack Developer, Flutter Developer, Technical Content Writer - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India.',
      clientsSection: {
        heading: '🤝 Clients',
      },
      designSection: {
        heading: '🎨 Design',
      },
      projectsSection: {
        heading: '🏗 Projects',
      },
      servicesSection: {
        heading: '🛠 Services',
      },
      blogsSection: {
        heading: '✍️ Blogs',
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
