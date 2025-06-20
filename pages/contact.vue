<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner
      title="Contact"
      headline="You can reach out to me via any of these channels. If you love emails, you can send me one at [ravgeetdhillon@gmail.com](mailto:ravgeetdhillon@gmail.com). I am open to working with startups and businesses that offer remote work."
    />

    <div class="col-12">
      <div class="row">
        <div v-for="(link, linkIndex) in socialLinks" :key="linkIndex" class="col-sm-4 mb-3">
          <div
            class="shadow-lg-hover border border-theme-white-light rounded w-100 h-100 p-3 d-flex align-items-center"
          >
            <b-icon v-if="link.icon" :icon="link.icon" class="text-dark-light mr-2" />
            <a :href="link.href" class="text-dark text-decoration-none stretched-link d-block">
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
          icon: 'google',
        },
        {
          name: 'Twitter',
          href: 'https://twitter.com/ravgeetdhillon',
          icon: 'twitter',
        },
        {
          name: 'LinkedIn',
          href: 'https://linkedin.com/in/ravgeetdhillon/',
          icon: 'linkedin',
        },
        {
          name: 'Dribbble',
          href: 'https://dribbble.com/ravgeetdhillon/',
        },
        {
          name: 'GitHub',
          href: 'https://github.com/ravgeetdhillon',
          icon: 'github',
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
