<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <blog-detailed :blog="blog" />
    <div class="col-12">
      <newsletter />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services, params }) {
    const { slug } = params
    const blog = await $services.blogs.findOne({ slug })
    return { blog }
  },

  data() {
    return {
      title: 'Blog - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
    }
  },

  head() {
    return {
      title: this.blog.title,
    }
  },
}
</script>
