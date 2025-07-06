<template>
  <div>
    <nuxt-link :to="`/services/${service.slug}`">
      <div class="h6">{{ service.title }}</div>
    </nuxt-link>
    <div class="text-dark-light">
      {{ service.promo }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
    showDate: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>
