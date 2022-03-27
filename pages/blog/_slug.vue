<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <blog-detailed :blog="blog" />
    <div class="col-12">
      <newsletter />
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
