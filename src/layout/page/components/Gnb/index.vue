<style lang="scss" scoped>
.gnb-container {
  position: sticky;
  top: 0;
  z-index: 2;
  min-width: 320px;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #000;
  text-align: center;
  h1 {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    a {
      display: inline-block;
      font: {
        weight: 700;
        size: 25px;
        family: "NanumSquare";
      }
    }
  }
  .search-form {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    height: 50px;
    transform: translateX(-50%);
    form {
      input {
      }
      button {
        margin-left: 5px;
      }
    }
  }

  .lang {
    position: absolute;
    top: 50%;
    right: 60px;
    transform: translateY(-50%);
  }
}

#gnb {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  .btn-gnb {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
  }
  ul {
    display: none;
  }
}
</style>

<template lang="pug">
.gnb-container
  h1 #[a(href="javascript:;") title : {{ title }}]


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
