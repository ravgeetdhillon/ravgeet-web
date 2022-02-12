<template>
  <div class="row w-lg-75 mx-lg-auto">
    <div class="col-12">
      <h1 class="h3">🔴 Error {{ error.statusCode }}</h1>
      <p class="text-dark-light lead">{{ error.message }}</p>
      <p class="text-dark-light mb-0 small">
        Please
        <a :href="`${$config.site.repo}/issues/`">file an issue</a>
        on the GitHub.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: { error: { type: Object, required: true } },
}
</script>
