<template>
  <header class="bg-theme-white">
    <div class="container">
      <div class="row w-lg-75 mx-lg-auto">
        <div
          class="
            col-12
            d-flex
            flex-sm-row flex-column
            justify-content-between
            align-items-sm-center
            py-3
          "
        >
          <div class="brand d-flex mr-3 mb-sm-0 mb-3">
            <nuxt-link
              to="/"
              class="d-flex align-items-center text-decoration-none text-dark"
            >
              <img
                src="/images/icons/logos/ravgeet-dhillon-small.jpg"
                class="img-fluid rounded-circle mr-2"
                style="max-width: 2.5rem"
              />
              <div>
                <p class="mb-n1">{{ $config.site.author }}</p>
                <small class="text-muted">Developer and Writer</small>
              </div>
            </nuxt-link>
          </div>
          <ul class="navbar list-unstyled d-flex flex-wrap mb-0 p-0">
            <li v-for="(link, index) in navbarLinks" :key="index" class="ml-3">
              <a
                v-if="link.external || link.static"
                :href="link.url"
                class="text-muted text-xs-center text-decoration-none"
              >
                {{ link.title }}
                <span v-if="link.external"><ExternalLink /></span>
              </a>
              <nuxt-link
                v-else
                class="text-muted text-xs-center text-decoration-none"
                :to="link.url"
              >
                {{ link.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navbarLinks: [
        {
          title: 'Story',
          url: '/story',
        },
        {
          title: 'Projects',
          url: '/projects',
        },
        // {
        //   title: 'Services',
        //   url: '/services',
        // },
        // {
        //   title: 'Clients',
        //   url: '/clients',
        // },
        {
          title: 'Blog',
          url: '/blog',
        },
        {
          title: 'Contact',
          url: '/contact',
        },
        {
          title: 'Resume',
          url: '/files/ravgeet-dhillon-resume.pdf',
          static: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar .nuxt-link-exact-active {
  font-weight: bold;
}
</style>
