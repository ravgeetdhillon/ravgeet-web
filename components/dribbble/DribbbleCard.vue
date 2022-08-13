<template>
  <div class="shadow-lg-hover border border-theme-white-light rounded w-100 h-100 overflow-hidden">
    <img class="img-cover" :src="post.images.normal" :alt="post.title" />
    <div class="d-flex justify-content-between align-items-center py-2 px-3">
      <p class="mb-0 mr-3 text-truncate">{{ post.title }}</p>
      <div class="text-muted" title="View on Dribbble"><external-link /></div>
    </div>
    <a :href="post.html_url" class="stretched-link" target="_blank" rel="noopener noreferrer" />
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>
