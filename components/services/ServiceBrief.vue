<template>
  <div>
    <nuxt-link :to="`/services/${service.slug}`">
      <h3 v-if="hasHeading">{{ service.title }}</h3>
      <p v-else class="h4">{{ service.title }}</p>
    </nuxt-link>
    <p class="text-dark-light mb-0">
      {{ service.promo }}
    </p>
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
    hasHeading: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>
