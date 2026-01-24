<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner
      :title="`Blogs (${filteredBlogs.length})`"
      headline="A curated list of articles that I've written for different publications on the Internet."
    />

    <!-- Search Bar -->
    <div class="col-12 mb-5">
      <div class="form-group mb-0">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search blogs..."
          @input="handleSearch"
        />

        <small v-if="searchQuery && filteredBlogs.length === 0" class="text-muted mt-2 d-block">
          No blogs found matching "{{ searchQuery }}"
        </small>
        <small v-else-if="searchQuery" class="text-muted mt-2 d-block">
          Showing {{ filteredBlogs.length }} of {{ totalBlogs }} blogs
        </small>
      </div>
    </div>

    <div v-if="!error" class="col-12 mb-5">
      <div
        v-for="(blog, blogIndex) in filteredBlogs"
        :key="blog.nid"
        :class="cx('w-100', { 'mb-5': blogIndex !== filteredBlogs.length - 1 })"
      >
        <blog-brief :blog="blog" />
      </div>
    </div>
    <div v-else class="col-12">
      <div class="alert alert-danger">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services }) {
    const { blogs, totalBlogs, error } = await $services.blogs.find({})
    return { blogs, totalBlogs, error }
  },

  data() {
    return {
      title: 'Blog - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
      searchQuery: '',
      filteredBlogs: [],
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

  computed: {
    displayBlogs() {
      return this.searchQuery ? this.filteredBlogs : this.blogs
    },
  },

  mounted() {
    // Initialize filtered blogs with all blogs
    this.filteredBlogs = this.blogs
  },

  methods: {
    async handleSearch() {
      if (!this.searchQuery.trim()) {
        this.filteredBlogs = this.blogs
        return
      }

      try {
        const { blogs } = await this.$services.blogs.search({
          query: this.searchQuery.trim(),
        })
        this.filteredBlogs = blogs || []
      } catch (error) {
        console.error('Search error:', error)
        this.filteredBlogs = []
      }
    },
  },
}
</script>
