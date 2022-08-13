<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner
      title="Blogs"
      headline="These are the blogs that I've written for different publications around the net."
    />
    <div class="col-12 mb-5">
      <div
        v-for="(blog, blogIndex) in blogs"
        :key="blog.nid"
        :class="cx('w-100', { 'mb-4': blogIndex !== blogs.length - 1 })"
      >
        <blog-brief :blog="blog" />
      </div>
    </div>
    <div
      :class="
        cx('col-12 d-flex', {
          'justify-content-end': !hasNewPage,
          'justify-content-between': hasNewPage && hasOlderPage,
        })
      "
    >
      <nuxt-link v-if="hasNewPage" :to="`/blog/page/${newPage}`"
        ><b-icon icon="arrow-left" /> New</nuxt-link
      >
      <nuxt-link :to="`/blog/page/${olderPage}`">Older <b-icon icon="arrow-right" /></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services, params, error }) {
    const { page } = params
    const intPage = parseInt(page)
    if (intPage <= 0) {
      error({ statusCode: 404, message: 'This page could not be found' })
    }
    const blogs = await $services.blogs.findByPage({ page })
    return { blogs, page: parseInt(page) }
  },

  computed: {
    olderPage() {
      return this.page + 1
    },

    newPage() {
      return this.page - 1
    },

    hasOlderPage() {
      return this.olderPage > 0
    },

    hasNewPage() {
      return this.newPage > 0
    },
  },
}
</script>
