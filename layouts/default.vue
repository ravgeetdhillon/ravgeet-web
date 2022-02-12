<template>
  <div>
    <div class="top-wrapper">
      <Navbar />
      <main class="py-5">
        <div class="container">
          <Nuxt />
        </div>
      </main>
    </div>
    <div class="bottom-wrapper">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
#__nuxt {
  min-height: 100vh;
}
#__layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }
}
</style>
