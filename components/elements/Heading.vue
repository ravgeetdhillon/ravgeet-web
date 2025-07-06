<template>
  <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
    <div class="font-weight-bold mb-0 mr-3 h5">
      {{ title }}
    </div>
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
