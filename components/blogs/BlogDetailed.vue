<template>
  <div class="col-12 mb-4">
    <div class="mb-5">
      <div class="mb-4">
        <back-link label="All Blogs" to="/blog" />
        <h3 class="mb-3">{{ blog.title }}</h3>
        <p class="text-muted" :title="formatDateTime(blog.publishedAt)">
          {{ formatDate(blog.publishedAt) }}
        </p>
      </div>
      <img
        v-if="blog.coverImage"
        :src="blog.coverImage.url"
        class="img-fluid rounded w-100"
        :alt="`${blog.title} blog`"
      />
    </div>

    <div class="markdown-body mb-4" v-html="markdownify(blog.content.markdown)" />
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
