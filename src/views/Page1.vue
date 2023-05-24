<style lang="scss"></style>

<template lang="pug">
.wrap
  h2 {{ title }}
</template>

<script>
export default {
  name: "Rooms",
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
};
</script>
