<template>
  <nuxt-link :to="to" class="btn btn-sm btn-theme-white mb-4">&larr; {{ label }}</nuxt-link>
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
