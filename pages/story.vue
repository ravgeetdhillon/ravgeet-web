<template>
  <div>
    <div class="row w-lg-75 mx-lg-auto">
      <Banner title="Story" />
      <div class="col-12">
        <nuxt-content class="markdown-body" :document="pageContent" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const pageContent = await $content('extra', 'story').fetch()
    return { pageContent }
  },

  data() {
    return {
      title:
        'Full Stack Developer, Flutter Developer, Technical Content Writer - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India.',
      landing: {
        heading: "I'm Ravgeet 👋",
        status: 'Full Stack Developer and Technical Content Writer',
      },
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
