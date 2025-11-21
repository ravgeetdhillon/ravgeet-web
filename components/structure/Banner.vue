<template>
  <div class="col-12 mb-5">
    <div class="h5 border-bottom pb-2 font-weight-bold">{{ title }}</div>
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
