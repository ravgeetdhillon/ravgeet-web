<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner
      :title="`Blogs (${totalBlogs})`"
      headline="These are the blogs that I've written for different publications on the Internet."
    />
    <div class="col-12 mb-5">
      <div
        v-for="(blog, blogIndex) in blogs"
        :key="blog.nid"
        :class="cx('w-100', { 'mb-5': blogIndex !== blogs.length - 1 })"
      >
        <blog-brief :blog="blog" />
      </div>
    </div>
    <div v-if="hasNextPage" class="col-12 d-flex justify-content-end">
      <b-button variant="link" class="p-0" @click="loadMorePosts">Load More...</b-button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services }) {
    const { blogs, totalBlogs, hasNextPage, endCursor } = await $services.blogs.find({
      lastPostId: '',
    })
    return { blogs, totalBlogs, hasNextPage, endCursor }
  },

  data() {
    return {
      title: 'Blog - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
      lastPostId: '',
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

  methods: {
    async loadMorePosts() {
      const { blogs, hasNextPage, endCursor } = await this.$services.blogs.find({
        lastPostId: this.endCursor,
      })
      this.blogs = [...this.blogs, ...blogs]
      this.endCursor = endCursor
      this.hasNextPage = hasNextPage
    },
  },
}
</script>
