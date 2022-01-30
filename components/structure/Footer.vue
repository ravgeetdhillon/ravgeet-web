<template>
  <footer class="bg-theme-white small py-5">
    <div class="container">
      <div class="row w-lg-75 w-xl-60 mb-4 mx-lg-auto">
        <div class="col-12">
          <p class="text-muted">About this Website</p>
          <p class="text-dark-light mb-0">
            Powered by <a href="https://nuxtjs.org">NuxtJs</a>, deployed on
            <a href="https://netlify.com">Netlify</a>. Designed and written by
            <a href="https://linkedin.com/in/ravgeetdhillon">Ravgeet</a>.
          </p>
        </div>
      </div>
      <div class="row w-lg-75 w-xl-60 mx-lg-auto text-muted">
        <div class="col-12 d-flex justify-content-between flex-wrap">
          <div class="d-flex pt-3">
            <a :href="$config.site.repo">Source Code</a>
            <a href="https://www.ravsam.in/newsletter/" class="ml-3"
              >Newsletter</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
