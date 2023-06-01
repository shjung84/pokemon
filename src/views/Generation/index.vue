<style lang="scss" scoped>
.category {
  margin-bottom: 30px;
  ul {
    text-align: center;
    li {
      $li: &;
      display: inline-block;
      margin: 3px 5px;
      a {
        display: block;
        padding: 2px 10px;
        background-color: #666;
        color: $color-bg;
        @include border-radius(4px);
      }
      &.is-active a {
        background-color: $color-theme-sub;
      }
    }
  }
}
.test-area {
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 50;
  padding: 3px;
  border: 1px solid #000;
  background-color: #fff;
  font-weight: 700;
}
/* .list--gallery {
  height: calc(100vh - 50px);
  overflow-y: auto;
  border: 5px solid #000;
} */
</style>
<style lang="scss"></style>
<template lang="pug">
.wrap
  h2 {{ title }}


</template>

<script>
export default {
  name: "MyPokemonList",
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
