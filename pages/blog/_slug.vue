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

  head() {
    return {
      title: this.blog.title,
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
