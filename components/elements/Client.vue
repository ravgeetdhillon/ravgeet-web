<template>
  <div class="shadow-lg-hover border border-theme-white-light rounded w-100 h-100">
    <!-- <img
      class="img-fluid"
      style="max-height: 2.5rem"
      :src="`/images/projects/${client.image}`"
      :alt="`${client.name} client`"
    /> -->
    <p class="mb-0 py-2 px-3 text-truncate">{{ client.name }}</p>
    <nuxt-link :to="`/clients/${client.slug}`" class="stretched-link" />
  </div>
</template>

<script>
export default {
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
}
</script>
