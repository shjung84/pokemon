<style lang="scss" scoped>
#app {
  position: relative;
  min-width: 320px;
  min-height: 100%;
  height: 100%;
  // background-color: $color-theme-sub;
}
</style>
<template lang="pug">
#app
  router-view
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {},
  watch: {},
  data() {
    return {};
  },
  mounted() {
    console.log(`App : mounted`);
  },
};
</script>
