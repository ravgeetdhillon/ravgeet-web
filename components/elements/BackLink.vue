<template>
  <nuxt-link :to="to" class="btn btn-sm btn-link mb-0 p-0">&larr; {{ label }}</nuxt-link>
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
