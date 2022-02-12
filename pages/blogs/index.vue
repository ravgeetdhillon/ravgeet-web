<template>
  <div class="row w-lg-75 mx-lg-auto">
    <Banner title="Blogs" />
    <div
      v-for="(blog, blogIndex) in blogs"
      :key="blogIndex"
      class="col-12 mb-5"
    >
      <img
        :src="`/images/blogs/${blog.image}`"
        class="img-fluid rounded mb-3"
        :alt="`${blog.title} blog`"
      />
      <div class="mb-3 d-flex flex-wrap align-items-center">
        <span
          v-for="(tag, tagIndex) in blog.category"
          :key="tagIndex"
          :class="`badge badge-theme-white p-1 ${
            tagIndex != blog.category.length - 1 ? 'mr-2' : ''
          }`"
        >
          {{ tag }}
        </span>
      </div>
      <nuxt-link :to="`/blogs/${blog.slug}`">
        <h2 class="h3">{{ blog.title }}</h2>
      </nuxt-link>
      <p class="text-dark-light mb-2">
        {{ blog.promo }}
      </p>
      <div class="d-flex flex-wrap align-items-center text-muted">
        <span>Tech Stack -&nbsp;</span>
        <span v-for="(tool, toolIndex) in blog.tech_stack" :key="toolIndex">
          {{ tool
          }}<span v-if="toolIndex != blog.tech_stack.length - 1">,&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const blogs = await $content('blogs').fetch()
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
