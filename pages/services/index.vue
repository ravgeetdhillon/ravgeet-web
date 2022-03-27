<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner title="Services" />
    <div v-for="(service, serviceIndex) in services" :key="serviceIndex" class="col-12 mb-5">
      <img
        :src="`/images/services/${service.image}`"
        class="img-fluid rounded mb-3"
        :alt="`${service.title} service`"
      />
      <div class="mb-3 d-flex flex-wrap align-items-center">
        <span
          v-for="(tag, tagIndex) in service.category"
          :key="tagIndex"
          :class="`badge badge-theme-white p-1 ${
            tagIndex != service.category.length - 1 ? 'mr-2' : ''
          }`"
        >
          {{ tag }}
        </span>
      </div>
      <nuxt-link :to="`/services/${service.slug}`">
        <h2 class="h3">{{ service.title }}</h2>
      </nuxt-link>
      <p class="text-dark-light mb-2">
        {{ service.promo }}
      </p>
      <div class="d-flex flex-wrap align-items-center text-muted">
        <span>Tech Stack -&nbsp;</span>
        <span v-for="(tool, toolIndex) in service.tech_stack" :key="toolIndex">
          {{ tool }}<span v-if="toolIndex != service.tech_stack.length - 1">,&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const services = await $content('services').fetch()
    return { services }
  },

  data() {
    return {
      title: 'Projects - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
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
