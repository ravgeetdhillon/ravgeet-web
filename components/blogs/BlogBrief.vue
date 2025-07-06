<template>
  <div>
    <p v-if="showDate" class="text-muted mb-2 small" :title="formatDateTime(blog.publishedAt)">
      {{ formatDate(blog.publishedAt) }}
    </p>
    <nuxt-link :to="`/blog/${blog.slug}`">
      <div class="h6">{{ blog.title }}</div>
    </nuxt-link>
    <div class="text-dark-light text-truncate">
      {{ blog.subtitle ?? blog.brief }}
    </div>
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
  },
}
</script>
