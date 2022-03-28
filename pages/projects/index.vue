<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner title="Projects" headline="Open Source, Personal, and Freelance projects." />
    <div v-for="project in projects" :key="project.nid" class="col-md-6 mb-5">
      <project-brief :project="project" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services }) {
    const projects = await $services.projects.find()
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
