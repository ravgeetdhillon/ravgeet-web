<template>
  <div class="col-12 mb-4">
    <div class="mb-5">
      <div class="mb-4">
        <back-link label="All Blogs" to="/blog" />
        <h1 class="mb-3">{{ blog.title }}</h1>
        <p class="text-muted" :title="formatDateTime(blog.dateAdded)">
          {{ formatDate(blog.dateAdded) }}
        </p>
      </div>
      <img
        v-if="blog.coverImage"
        :src="blog.coverImage"
        class="img-fluid rounded w-100"
        :alt="`${blog.title} blog`"
      />
    </div>

    <div class="markdown-body mb-4" v-html="markdownify(blog.contentMarkdown)" />
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
