<template>
  <div class="">
    <pre>{{ blog }}</pre>
    <p class="">{{ blog.title }}</p>
    <p>{{ blog.createdAt }}</p>
    <nuxt-link :to="`/blogs/${blog.slug}`" class="stretched-lin" />
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
pre {
  max-height: 100px;
  overflow-y: auto;
}
</style>
