<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <blog-detailed :blog="blog" />
    <div class="col-12 mb-5">
      <newsletter />
    </div>
    <div class="col-12 mb-4">
      <div class="h6 mb-0 border-bottom pb-2">🧠 More Interesting Reads</div>
    </div>
    <div v-for="b in allSuggestedBlogs" :key="b.nid" class="col-12 mb-4">
      <blog-brief :blog="b" :show-date="false" :has-heading="false" />
    </div>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'

export default {
  async asyncData({ $services, params }) {
    const { slug } = params
    const blog = await $services.blogs.findOne({ slug })
    const { blogs: allBlogs } = await $services.blogs.find({})

    // Filter related blogs when they share at least 4 words in the title with the current blog
    const relatedBlogsOnTitles = allBlogs.filter(
      (b) =>
        b.slug !== blog.slug &&
        b.title
          .toLowerCase()
          .split(' ')
          .filter((word) =>
            blog.title
              .toLowerCase()
              .split(' ')
              .map((t) => t)
              .includes(word)
          )?.length >= 4
    )

    // Filter related blogs when they share at least 2 tags with the current blog
    const relatedBlogsOnTags = allBlogs
      .filter(
        (b) => b.slug !== blog.slug && !relatedBlogsOnTitles.map((b) => b.slug).includes(b.slug)
      )
      .filter(
        (b) =>
          b.slug !== blog.slug &&
          b.tags.filter((tag) => blog.tags.map((t) => t.name).includes(tag.name))?.length >= 2
      )

    const allOtherBlogs = allBlogs.filter(
      (b) =>
        b.slug !== blog.slug &&
        ![...relatedBlogsOnTitles, ...relatedBlogsOnTags].map((b) => b.slug).includes(b.slug)
    )

    const allSuggestedBlogs = [
      ...shuffle(relatedBlogsOnTitles),
      ...shuffle(relatedBlogsOnTags),
      ...shuffle(allOtherBlogs),
    ].slice(0, 3)

    console.log({ relatedBlogsOnTitles, relatedBlogsOnTags, allOtherBlogs })

    return { blog, allSuggestedBlogs }
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
