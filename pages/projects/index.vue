<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner title="Projects" headline="Open Source, Personal, and Freelance projects." />
    <div v-for="project in projects" :key="project.nid" class="col-md-6 mb-5">
      <project-brief :project="project" />
    </div>
    <div :class="`mb-5 ${projects.length % 2 === 0 ? 'col-md-12' : 'col-md-6'}`">
      <div
        class="shadow-lg-hover bg-dark text-light border border-theme-white-light rounded w-100 h-100 overflow-hidden"
      >
        <div class="d-flex justify-content-center align-items-center py-2 px-3 h-100">
          <p class="mb-0 mr-3 text-truncate">Visit GitHub &rarr;</p>
        </div>
        <a href="https://github.com/ravgeetdhillon?tab=repositories" class="stretched-link" />
      </div>
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
