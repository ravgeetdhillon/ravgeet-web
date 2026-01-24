<template>
  <div>
    <div class="d-flex small text-muted mb-2">
      <div v-if="showDate" :title="formatDateTime(blog.publishedAt)">
        {{ formatDate(blog.publishedAt) }}
      </div>
      <div class="mx-2">&bull;</div>
      <div :title="blog.views">{{ roundViews(blog.views) }} reads</div>
    </div>
    <nuxt-link :to="`/blog/${blog.slug}`">
      <div class="h6">{{ blog.title }}</div>
    </nuxt-link>
    <div v-if="blog.subtitle ?? blog.brief" class="text-dark-light text-truncate small">
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
