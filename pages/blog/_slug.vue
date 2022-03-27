<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <div class="col-12">
      <div class="mb-5">
        <div class="mb-4">
          <back-link label="All Blogs" to="/blog" />
          <h1 class="mb-3">{{ blog.title }}</h1>
          <p class="text-muted">
            {{
              new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long',
              }).format(new Date(blog.dateAdded))
            }}
          </p>
        </div>
        <img :src="blog.coverImage" class="img-fluid rounded" :alt="`${blog.title} blog`" />
      </div>

      <div class="markdown-body mb-4" v-html="markdownify(blog.contentMarkdown)" />
    </div>
  </div>
</template>

<script>
import { ArticlesAPI } from '~/utils/articles'

export default {
  async asyncData({ $axios, params }) {
    const { slug } = params
    const { blog } = await ArticlesAPI($axios).findOne({ slug })
    return { blog }
  },

  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://hashnode.ravgeet.in/' + this.blog.slug,
        },
      ],
    }
  },
}
</script>
