<template>
  <div>
    <section class="py-5">
      <div class="container">
        <div class="row w-lg-75 w-xl-60 mx-lg-auto align-items-start">
          <div class="col-12">
            <div class="mb-4">
              <div class="d-flex align-items-center">
                <h1>{{ project.title }}</h1>
                <div class="ml-3">
                  <span
                    v-for="(tag, index) in project.tags"
                    :key="index"
                    :class="`badge badge-theme-white p-1 ${
                      tagIndex != project.tags.length - 1 ? 'mr-1' : ''
                    }`"
                    >{{ tag }}</span
                  >
                </div>
              </div>
              <p class="text-dark-light lead">{{ project.mini_description }}</p>
            </div>
            <div
              class="d-flex flex-wrap align-items-center text-dark-light mb-4"
            >
              <span>Tools -&nbsp;</span>
              <span v-for="(tool, toolIndex) in project.tools" :key="toolIndex">
                {{ tool
                }}<span v-if="toolIndex != project.tools.length - 1"
                  >,&nbsp;</span
                >
              </span>
            </div>
            <div class="mb-4">
              <img
                :src="`/images/projects/${project.img}`"
                class="img-fluid rounded"
                :alt="`${project.title} project`"
              />
            </div>
            <nuxt-content class="markdown-body mb-4" :document="project" />
            <div class="mb-4">
              <p class="mb-2 lead font-weight-normal">Resources</p>
              <a
                v-if="project.github"
                :href="project.github"
                class="btn btn-outline-primary btn-sm"
                >GitHub</a
              >
              <a
                v-if="project.gitlab"
                :href="project.gitlab"
                class="btn btn-outline-primary btn-sm"
                >Gitlab</a
              >
              <a
                v-if="project.view_link"
                :href="project.view_link"
                class="btn btn-outline-primary btn-sm"
                >View Live</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const project = await $content('projects', params.slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return { project }
  },
}
</script>
