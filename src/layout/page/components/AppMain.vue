<style lang="scss" scoped>
/* Main */
.app-container {
  position: relative;
  z-index: 1;
  padding-left: $lnb-width;
  .app-main {
    padding: 30px;
    border: 1px solid #000;
  }
}
</style>
<style lang="scss"></style>

<template lang="pug">
.app-container
  .app-main
    router-view(:title="title")
</template>

<script>
export default {
  name: "AppMain",
  components: {},
  computed: {
    title() {
      // console.log("AppMain :", this.$route.meta.title);
      return this.$route.meta.title;
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
