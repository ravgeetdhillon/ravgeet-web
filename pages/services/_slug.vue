<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <div class="col-12">
      <div class="mb-4">
        <div class="mb-4">
          <back-link label="All Services" to="/services" />
          <h1>{{ service.title }}</h1>
          <p class="text-dark-light lead">
            {{ service.promo }}
          </p>
        </div>

        <img
          :src="`/images/services/${service.image}`"
          class="img-fluid rounded mb-4"
          :alt="`${service.title} service`"
        />

        <div class="col-12 border rounded">
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Category</div>
            <div class="col-8">
              <span
                v-for="(tag, tagIndex) in service.category"
                :key="tagIndex"
                :class="`${tagIndex != service.category.length - 1 ? 'mr-2' : ''}`"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Tech Stack</div>
            <div class="col-8">
              <span
                v-for="(tool, toolIndex) in service.tech_stack"
                :key="toolIndex"
                :class="`${toolIndex != service.tech_stack.length - 1 ? 'mr-2' : ''}`"
              >
                {{ tool }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <nuxt-content class="markdown-body mb-4" :document="service" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services, params }) {
    const { slug } = params
    const service = await $services.services.findOne({ slug })
    return { service }
  },
}
</script>
