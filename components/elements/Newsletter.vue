<template>
  <div class="bg-theme-white p-4 rounded">
    <h2>{{ heading }}</h2>
    <div class="text-dark-light" v-html="markdownify(promo)" />
    <a :href="$config.site.newsletter" class="btn btn-primary btn-block">
      Subscribe <b-icon-arrow-right-short />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heading: '🚀 Come Join my Newsletter',
      promo:
        'I share tips on how to get started with freelancing, remote jobs, developer-related stuff, startup ecosystem, and lots of insider secrets with my subscribers.',
    }
  },
}
</script>
