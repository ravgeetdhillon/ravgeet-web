<template>
  <div>
    <nuxt-link :to="`/services/${service.slug}`">
      <div>{{ service.title }}</div>
    </nuxt-link>
    <div class="text-dark-light small">
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
