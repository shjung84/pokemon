<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  h2 {{ title }}
  .wrap-inner
</template>

<script>
export default {
  name: "MyPage",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
