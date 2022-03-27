<template>
  <div class="col-12">
    <div class="mb-4">
      <back-link label="All Services" to="/services" />
      <h1>{{ service.title }}</h1>
    </div>
    <nuxt-content class="markdown-body" :document="service" />
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
}
</script>
