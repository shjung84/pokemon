<style lang="scss" scoped>
/* Main */
.app-main {
  padding: 30px;
}
</style>
<style lang="scss"></style>

<template lang="pug">
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
