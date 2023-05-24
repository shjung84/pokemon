<style lang="scss" scoped></style>

<template lang="pug">
#container
  comp-gnb()
  app-main
</template>

<script>
import CompGnb from "./components/CompGnb";
import AppMain from "./components/AppMain";

export default {
  components: {
    CompGnb,
    AppMain,
  },
  computed: {},
};
</script>
