<style lang="scss" scoped>
.app-wrap {
  position: relative;
  min-height: 100%;
  border: 1px solid #000;
}
</style>

<template lang="pug">
.app-wrap
  gnb(:title="title")
  lnb
  app-main
</template>

<script>
import Gnb from "./components/Gnb";
import Lnb from "./components/Lnb";
import AppMain from "./components/AppMain";

export default {
  props: {},
  components: {
    Gnb,
    Lnb,
    AppMain,
  },
  computed: {
    title() {
      console.log("app-wrap");
      return this.$route.meta.title;
    },
  },
};
</script>
