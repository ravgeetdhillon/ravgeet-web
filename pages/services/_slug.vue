<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <service-detailed :service="service" />
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
