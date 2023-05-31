<style lang="scss" scoped>
.lnb-container {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: $lnb-width;
  background-color: $color-theme-opacity-2;
}
#lnb {
  ul {
    li {
      a {
        display: block;
        position: relative;
        z-index: 2;
        padding: 10px 20px;
        transition: all 0.3s;
        &:hover {
          background-color: $color-theme-opacity-5;
        }
      }
      ul {
        display: none;
        position: relative;
        z-index: 1;
        li {
          background-color: $color-theme-opacity-3;
          a {
            padding-left: 30px;
          }
        }
      }
      &.is-active {
        background-color: $color-theme-opacity-3;
        > a {
          box-shadow: 0 2px 5px $color-border--opacity-2;
        }
        ul {
          display: block;
        }
      }
    }
  }
  > ul {
    > li {
      border-bottom: 1px solid $color-bg;
      > a {
        display: block;
        padding: 10px 20px;
      }
    }
  }
}
</style>

<template lang="pug">
.lnb-container
  #lnb
    ul
      li.is-active
        a(href="/Generation") 세대별
        ul
          li
            a(href="javascript:;") 1세대
          li
            a(href="javascript:;") 1세대
      li
        a(href="/Generation") 세대별
        ul
          li
            a(href="javascript:;") 1세대
          li
            a(href="javascript:;") 1세대


</template>

<script>
export default {
  name: "MyDevice",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
