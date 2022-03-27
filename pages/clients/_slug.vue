<template>
  <div class="row w-lg-75 mx-lg-auto align-items-start">
    <div class="col-12">
      <div class="mb-4">
        <div class="mb-4">
          <back-link label="All Clients" to="/clients" />
          <h1>{{ client.name }}</h1>
          <p class="text-dark-light lead">
            {{ client.promo }}
          </p>
        </div>

        <img
          :src="`/images/clients/${client.image}`"
          class="img-fluid rounded mb-4"
          :alt="`${client.name} client`"
        />

        <div class="col-12 border rounded">
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Category</div>
            <div class="col-8">
              <span
                v-for="(tag, tagIndex) in client.category"
                :key="tagIndex"
                :class="`${tagIndex != client.category.length - 1 ? 'mr-2' : ''}`"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="row py-2 border-bottom align-items-center">
            <div class="col-4 text-muted">Tech Stack</div>
            <div class="col-8">
              <span
                v-for="(tool, toolIndex) in client.tech_stack"
                :key="toolIndex"
                :class="`${toolIndex != client.tech_stack.length - 1 ? 'mr-2' : ''}`"
              >
                {{ tool }}
              </span>
            </div>
          </div>
          <div v-if="client.github" class="row py-2 align-items-center">
            <div class="col-4 text-muted">GitHub</div>
            <div class="col-8">{{ client.github }}</div>
          </div>
          <div v-if="client.gitlab" class="row py-2 align-items-center">
            <div class="col-4 text-muted">Gitlab</div>
            <div class="col-8">{{ client.gitlab }}</div>
          </div>
          <div v-if="client.view_link" class="row py-2 align-items-center">
            <div class="col-4 text-muted">Live View</div>
            <div class="col-8">{{ client.view_link }}</div>
          </div>
        </div>
      </div>

      <nuxt-content class="markdown-body mb-4" :document="client" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services, params }) {
    const { slug } = params
    const client = await $services.clients.findOne({ slug })
    return { client }
  },
}
</script>
