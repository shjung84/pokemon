<style lang="scss" scoped>
.lnb-container {
  overflow: hidden;
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
      li(v-for="item of menuList" :class="{'is-active' : item.active}")
        router-link(:to="item.to") {{ item.name }}
      li ======================================
      //- li.is-active
      //-   router-link(to="/Generation") #[em 세대별]

      //-   ul
      //-     li
      //-       router-link(to="/Generation/1세대") #[em 1세대]
      //-     li
      //-       router-link(to="/Generation/2세대") #[em 2세대]
      //- li
      //-   a(href="/Pokemon") 타입별
      //-   ul
      //-     li
      //-       a(href="javascript:;") 타입
      //-     li
      //-       a(href="javascript:;") 타입


</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Lnb",
  components: {},
  watch: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["menuList"]),
  },
  methods: {},
};
</script>
