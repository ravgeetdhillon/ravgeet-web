<template>
  <div>
    <p v-if="showDate" class="text-muted mb-2 small" :title="formatDateTime(blog.publishedAt)">
      {{ formatDate(blog.publishedAt) }}
    </p>
    <nuxt-link :to="`/blog/${blog.slug}`">
      <h3 v-if="hasHeading">{{ blog.title }}</h3>
      <p v-else class="h4">{{ blog.title }}</p>
    </nuxt-link>
    <p class="text-dark-light mb-0 text-truncate">
      {{ blog.subtitle ?? blog.brief }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    blog: {
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
