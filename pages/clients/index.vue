<template>
  <div class="row w-lg-75 mx-lg-auto">
    <Banner title="Clients" />
    <div
      v-for="(client, clientIndex) in clients"
      :key="clientIndex"
      class="col-6 mb-4"
    >
      <Client :client="client" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const clients = await $content('clients').fetch()
    return {
      clients,
    }
  },

  data() {
    return {
      name: 'Clients - Ravgeet Dhillon',
      description:
        'Ravgeet Dhillon is a Full Stack Developer, Flutter Developer, and Technical Content Writer based in India',
    }
  },

  head() {
    return {
      name: this.name,
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
