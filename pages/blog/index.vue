<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Blog - Ravgeet Dhillon',
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

  created() {
    this.$router.push('/blog/page/1')
  },
}
</script>
