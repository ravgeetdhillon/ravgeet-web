<template>
  <div class="row w-lg-75 mx-lg-auto">
    <Banner title="Blogs" />
    <div
      v-for="(blog, blogIndex) in blogs"
      :key="blogIndex"
      class="col-12 mb-5"
    >
      <p class="text-muted">
        {{
          new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
          }).format(new Date(blog.dateAdded))
        }}
      </p>
      <nuxt-link :to="`/blog/${blog.slug}`">
        <h2 class="h3">{{ blog.title }}</h2>
      </nuxt-link>
      <p class="text-dark-light mb-2 text-truncate">
        {{ blog.brief }}
      </p>
    </div>
  </div>
</template>

<script>
import { ArticlesAPI } from '~/utils/articles'

export default {
  async asyncData({ $axios }) {
    const { blogs } = await ArticlesAPI($axios).find()
    return { blogs }
  },

  data() {
    return {
      title: 'Projects - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
}
</script>
