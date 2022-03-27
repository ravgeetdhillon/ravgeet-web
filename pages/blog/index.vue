<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner
      title="Blogs"
      headline="These are the blogs that I've written for different publications around the net."
    />
    <div
      v-for="(blog, blogIndex) in blogs"
      :key="blog.nid"
      :class="cx('col-12', { 'mb-5': blogIndex !== blogs.length - 1 })"
    >
      <blog-brief :blog="blog" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services }) {
    const blogs = await $services.blogs.find()
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
