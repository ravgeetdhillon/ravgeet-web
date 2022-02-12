<template>
  <nuxt-link :to="to" class="btn btn-sm btn-theme-white mb-4">
    <b-icon-arrow-left-short /> {{ label }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
