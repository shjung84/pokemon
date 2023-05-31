<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  h2 {{ title }}

</template>

<script>
export default {
  name: "pokemonDetail",
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
  mounted() {},
  methods: {},
  created() {},
};
</script>
