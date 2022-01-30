<template>
  <div>
    <Banner
      title="Contact"
      headline="If you want me to work on your project, feel free to [send me an email](mailto:ravgeetdhillon@gmail.com). I am open to working with startups and businesses that offer remote work."
    />
    <section class="py-5">
      <div class="container">
        <div class="row w-lg-75 w-xl-60 mx-lg-auto">
          <div class="col-12">
            <a
              v-for="(link, linkIndex) in socialLinks"
              :key="linkIndex"
              :href="link.href"
              :class="`d-block ${
                linkIndex != socialLinks.length - 1 ? 'mb-3' : ''
              }`"
              >{{ link.name }}</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'default',

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
