<template>
  <div class="row w-lg-75 mx-lg-auto">
    <Banner
      title="Contact"
      headline="If you want me to work on your project, feel free to [send me an email](mailto:ravgeetdhillon@gmail.com). I am open to working with startups and businesses that offer remote work."
    />

    <div class="col-12">
      <div class="row">
        <div
          v-for="(link, linkIndex) in socialLinks"
          :key="linkIndex"
          class="col-sm-4 mb-3"
        >
          <div
            class="shadow-lg-hover border border-theme-white-light rounded w-100 h-100 p-3"
          >
            <!-- <img
      class="img-fluid"
      style="max-height: 2.5rem"
      :src="`/images/projects/${client.image}`"
      :alt="`${client.name} client`"
    /> -->
            <a
              :href="link.href"
              class="text-decoration-none stretched-link d-block"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Contact - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
      socialLinks: [
        {
          name: 'Email',
          href: 'mailto:ravgeetdhillon@gmail.com',
        },
        {
          name: 'Twitter',
          href: 'https://twitter.com/ravgeetdhillon',
        },
        {
          name: 'LinkedIn',
          href: 'https://linkedin.com/in/ravgeetdhillon/',
        },
        {
          name: 'Dribbble',
          href: 'https://dribbble.com/ravgeetdhillon/',
        },
        {
          name: 'GitHub',
          href: 'https://github.com/ravgeetdhillon',
        },
        {
          name: 'Gitlab',
          href: 'https://gitlab.gnome.org/ravgeetdhillon',
        },
      ],
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
