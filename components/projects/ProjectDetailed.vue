<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <div class="col-12">
      <div class="mb-5">
        <div class="mb-5">
          <nuxt-link to="/projects" class="btn btn-sm btn-theme-white mb-4">
            &larr; All Projects
          </nuxt-link>
          <h3>{{ project.title }}</h3>
          <p class="text-dark-light">
            {{ project.promo }}
          </p>
        </div>

        <img
          :src="`/images/projects/${project.image}`"
          class="img-fluid w-100 rounded mb-5"
          :alt="`${project.title} project`"
        />

        <div class="col-12 border-top border-left border-right rounded">
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Category</div>
            <div class="col-8">
              {{ conjuction(project.category) }}
            </div>
          </div>
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Tech Stack</div>
            <div class="col-8">
              {{ conjuction(project.tech_stack) }}
            </div>
          </div>
          <div v-if="project.github" class="row border-bottom py-2 align-items-center">
            <div class="col-4 text-muted">GitHub</div>
            <div class="col-8">
              <a :href="project.github">{{ project.github }}</a>
            </div>
          </div>
          <div v-if="project.gitlab" class="row border-bottom py-2 align-items-center">
            <div class="col-4 text-muted">Gitlab</div>
            <div class="col-8">
              <a :href="project.gitlab">{{ project.gitlab }}</a>
            </div>
          </div>
          <div v-if="project.view_link" class="row border-bottom py-2 align-items-center">
            <div class="col-4 text-muted">Live View</div>
            <div class="col-8">
              <a :href="project.view_link">{{ project.view_link }}</a>
            </div>
          </div>
        </div>
      </div>

      <nuxt-content class="markdown-body" :document="project" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>
