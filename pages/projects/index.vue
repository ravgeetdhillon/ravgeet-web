<template>
  <div class="row w-lg-75 mx-lg-auto">
    <Banner title="Projects" />
    <div v-for="(project, projectIndex) in projects" :key="projectIndex" class="col-6 mb-5">
      <project-brief :project="project" />
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
