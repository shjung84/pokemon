<style lang="scss" scoped></style>

<template lang="pug">
header
  h1 #[a(href="javascript:;") {{  $store.state.pageParams }}]


  //- .search-form
    form
      input(type="text" placeholder="Search")
      el-button(icon="el-icon-search" size="default" circle)
      //- #[mdicon(name="magnify")]

  #gnb
    a.btn-gnb(href="javascript:;" title="") #[mdicon(name="menu" size="35")]

  .lang
    a(href="javascript:;" title="") #[mdicon(name="web" size="25")]
</template>

<script>
// import { ref } from "vue";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  watch: {},

  data() {
    return {};
  },
  mounted() {},
  computed: {
    key() {
      // console.log("Nav :", this.$route.fullPath);
      // return this.$route.fullPath;
      console.log("Nav :", this.$route.name);
      return this.$route.name;
    },
  },
  methods: {},
};
</script>
