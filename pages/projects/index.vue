---
permalink: /projects/

meta:
  title: Projects - Ravgeet Dhillon
  description: Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India.
---

<template>
  <div>
    <Banner title="Projects" />
    <section class="py-5">
      <div class="container">
        <div class="row w-xl-60 w-lg-75 mx-lg-auto">
          <div
            v-for="(project, projectIndex) in projects"
            :key="projectIndex"
            class="col-12 mb-5"
          >
            <div class="mb-3 d-flex flex-wrap align-items-center">
              <span
                v-for="(tag, tagIndex) in project.tags"
                :key="tagIndex"
                :class="`badge badge-theme-white p-1 ${
                  tagIndex != project.tags.length - 1 ? 'mr-1' : ''
                }`"
                >{{ tag }}</span
              >
            </div>
            <nuxt-link :to="`/projects/${project.slug}`" class="stretched-link">
              <h2 class="h3">{{ project.title }}</h2>
            </nuxt-link>
            <p class="text-dark-light lead mb-2">
              {{ project.mini_description }}
            </p>
            <div class="d-flex flex-wrap align-items-center text-muted">
              <span>Tools -&nbsp;</span>
              <span v-for="(tool, toolIndex) in project.tools" :key="toolIndex">
                {{ tool
                }}<span v-if="toolIndex != project.tools.length - 1"
                  >,&nbsp;</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const projects = await $content('projects').fetch()
    return {
      projects,
    }
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
