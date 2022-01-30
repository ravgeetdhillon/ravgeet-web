<template>
  <div>
    <section class="py-5 bg-theme-white">
      <div class="container">
        <div class="row w-lg-75 w-xl-60 mx-lg-auto">
          <div
            class="col-12 d-flex flex-wrap justify-content-between align-items-center"
          >
            <div class="mr-3">
              <h1>{{ landing.heading }}</h1>
              <p class="text-muted">{{ landing.status }}</p>
            </div>
            <img
              src="/images/icons/logos/ravgeet-dhillon.jpg"
              class="img-fluid rounded mb-4"
              style="max-width: 15rem"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="pt-3 py-5">
      <div class="container">
        <div class="row w-lg-75 w-xl-60 mx-lg-auto">
          <div class="col-12">
            <nuxt-content class="markdown-body mb-4" :document="pageContent" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const pageContent = await $content('extra', 'index').fetch()
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
