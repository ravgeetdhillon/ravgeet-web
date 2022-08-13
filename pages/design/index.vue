<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner title="Design" headline="UI/UX Ideas and Implementations." />
    <div v-for="post in posts" :key="post.nid" class="col-md-6 mb-5">
      <dribbble-card :post="post" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services }) {
    const posts = await $services.dribbble.find()
    return { posts }
  },

  data() {
    return {
      title: 'Design - Ravgeet Dhillon',
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
