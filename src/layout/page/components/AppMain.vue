<style lang="scss" scoped></style>
<style lang="scss"></style>

<template lang="pug">
#container
  .container-inner
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
