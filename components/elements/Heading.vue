<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="font-weight-bold mb-0 mr-3">
      {{ title }}
    </h2>
    <nuxt-link v-if="to" :to="to" class="btn btn-sm btn-theme-white">All &rarr;</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
