<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <div class="col-12">
      <div class="mb-4">
        <div class="mb-4">
          <back-link label="All Blogs" to="/blogs" />
          <h1>{{ blog.title }}</h1>
          <p class="text-dark-light lead">
            {{ blog.promo }}
          </p>
        </div>

        <img
          :src="`/images/blogs/${blog.image}`"
          class="img-fluid rounded mb-4"
          :alt="`${blog.title} blog`"
        />

        <div class="col-12 border rounded">
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Category</div>
            <div class="col-8">
              <span
                v-for="(tag, tagIndex) in blog.category"
                :key="tagIndex"
                :class="`${tagIndex != blog.category.length - 1 ? 'mr-2' : ''}`"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Tech Stack</div>
            <div class="col-8">
              <span
                v-for="(tool, toolIndex) in blog.tech_stack"
                :key="toolIndex"
                :class="`${
                  toolIndex != blog.tech_stack.length - 1 ? 'mr-2' : ''
                }`"
              >
                {{ tool }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <nuxt-content class="markdown-body mb-4" :document="blog" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const blog = await $content('blogs', params.slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return { blog }
  },
}
</script>
