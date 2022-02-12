<template>
  <div class="bg-theme-white p-4 rounded">
    <h2 class="">{{ heading }}</h2>
    <div v-html="markdownify(promo)" class="text-dark-light" />
    <form class="d-flex">
      <input placeholder="Your Email" type="email" class="form-control mr-3" />
      <button class="btn btn-primary">Subscribe</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heading: 'Come Join my Newsletter',
      promo:
        'Subscribe to the Newsletter to receive updates on everything **nuxtjs**, **aws amplify** and **sass** related.',
    }
  },
}
</script>
