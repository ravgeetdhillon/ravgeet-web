<template>
  <footer class="bg-theme-white small py-4">
    <div class="container">
      <div class="row w-lg-75 mb-3 mx-lg-auto">
        <div class="col-12">
          <p class="text-muted mb-2">About this Website</p>
          <p class="text-dark-light mb-0">
            Powered by <a href="https://nuxtjs.org">NuxtJs</a>, deployed on
            <a href="https://netlify.com">Netlify</a>. Designed and written by
            <a href="https://linkedin.com/in/ravgeetdhillon">Ravgeet</a>.
          </p>
        </div>
      </div>
      <div class="row w-lg-75 mx-lg-auto text-muted">
        <div class="col-12 d-flex justify-content-between flex-wrap">
          <div class="d-flex pt-3">
            <p class="mr-3 mb-0">
              Copyright &copy; {{ new Date().getFullYear() }}
              {{ $config.site.author }}
            </p>
            <a :href="$config.site.repo" class="mr-3">Source Code</a>
            <a :href="$config.site.newsletter" class="mr-3">Newsletter</a>
            <nuxt-link to="/contact">Contact</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
