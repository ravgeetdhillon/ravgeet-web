<template>
  <section
    class="py-5 d-flex flex-column justify-content-center bg-theme-white"
  >
    <div class="container">
      <div class="row w-lg-75 w-xl-60 mx-lg-auto">
        <div class="col-12">
          <h1 class="display-4">{{ title }}</h1>
          <div class="lead text-dark-light" v-html="markdownify(headline)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
