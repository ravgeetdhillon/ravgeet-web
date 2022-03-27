<template>
  <div class="row w-lg-75 mx-lg-auto">
    <banner title="Services" />
    <div
      v-for="(service, serviceIndex) in services"
      :key="service.nid"
      :class="cx('col-12', { 'mb-5': serviceIndex !== services.length - 1 })"
    >
      <service-brief :service="service" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services }) {
    const services = await $services.services.find()
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
