<template>
  <div class="col-12 mb-5">
    <h1>{{ title }}</h1>
    <div v-if="headline" class="text-dark-light" v-html="markdownify(headline)" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
