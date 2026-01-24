<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner
      :title="`Blogs (${filteredBlogs.length})`"
      headline="A curated list of articles that I've written for different publications on the Internet."
    />

    <div class="col-12 mb-5">
      <div class="row">
        <!-- Search -->
        <div class="col-md-8">
          <div class="form-group mb-0">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control form-control-sm"
              placeholder="Search blogs..."
              @input="handleSearch"
            />
          </div>
        </div>

        <!-- Sort -->
        <div class="col-md-4">
          <div class="form-group mb-0">
            <select v-model="sortBy" class="form-control form-control-sm" @change="applySorting">
              <option value="recent">Published recently</option>
              <option value="oldest">Published earliest</option>
              <option value="most-views">Most viewed</option>
              <option value="least-views">Least viewed</option>
            </select>
          </div>
        </div>
      </div>

      <small v-if="searchQuery && filteredBlogs.length === 0" class="text-muted mt-2 d-block">
        No blogs found matching "{{ searchQuery }}"
      </small>
      <small v-else-if="searchQuery" class="text-muted mt-2 d-block">
        Showing {{ filteredBlogs.length }} of {{ totalBlogs }} blogs
      </small>
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
      sortBy: 'recent',
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
    // Initialize filtered blogs with all blogs and apply initial sorting
    this.filteredBlogs = this.sortBlogs([...this.blogs])
  },

  methods: {
    sortBlogs(blogs) {
      const sorted = [...blogs]
      switch (this.sortBy) {
        case 'most-views':
          return sorted.sort((a, b) => (b.views || 0) - (a.views || 0))
        case 'least-views':
          return sorted.sort((a, b) => (a.views || 0) - (b.views || 0))
        case 'recent':
          return sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        case 'oldest':
          return sorted.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
        default:
          return sorted
      }
    },

    applySorting() {
      this.filteredBlogs = this.sortBlogs(this.filteredBlogs)
    },

    async handleSearch() {
      if (!this.searchQuery.trim()) {
        this.filteredBlogs = this.sortBlogs([...this.blogs])
        return
      }

      try {
        const { blogs } = await this.$services.blogs.search({
          query: this.searchQuery.trim(),
        })
        this.filteredBlogs = this.sortBlogs(blogs || [])
      } catch (error) {
        console.error('Search error:', error)
        this.filteredBlogs = []
      }
    },
  },
}
</script>
