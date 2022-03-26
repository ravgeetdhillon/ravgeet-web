<template>
  <div class="row w-lg-75 mx-lg-auto">
    <Banner title="Projects" />
    <div
      v-for="(project, projectIndex) in projects"
      :key="projectIndex"
      class="col-6 mb-5"
    >
      <div class="mb-3 d-flex flex-wrap align-items-center">
        <span
          v-for="(tag, tagIndex) in project.category"
          :key="tagIndex"
          :class="`badge badge-theme-white p-1 ${
            tagIndex != project.category.length - 1 ? 'mr-2' : ''
          }`"
        >
          {{ tag }}
        </span>
      </div>
      <nuxt-link :to="`/projects/${project.slug}`">
        <h2 class="h3">{{ project.title }}</h2>
      </nuxt-link>
      <p class="text-dark-light mb-2">
        {{ project.promo }}
      </p>
      <div class="d-flex flex-wrap align-items-center text-muted">
        <span>
          Tech Stack -&nbsp;
          {{
            new Intl.ListFormat('en', {
              style: 'long',
              type: 'conjunction',
            }).format(project.tech_stack)
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const projects = await $content('projects').fetch()
    return { projects }
  },

  data() {
    return {
      title: 'Projects - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
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
