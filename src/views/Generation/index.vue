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
  .list--gallery
    ul
      li.item__cell(v-for="item of pokemonList")
        a(href="javascript:;" class="item__cell--thumb" @click="pokeDetail(item.id)")
          img(:src="imageUrl + item.id + '.png'" width="96" height="96" alt="")
          em(class="item__cell--badge") #[i #]{{ item.id }}
          span {{ item.name }}


</template>

<script>
import { getPokemonList } from "@/api/pokemon.js";

export default {
  name: "MyPokemonList",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  watch: {
    "$route.query"(newVal, oldVal) {
      if (newVal.page !== oldVal.page) {
        console.log(`newVal.page :: ${newVal.page}, oldVal.page :: ${oldVal.page}`);
        // this.fetchList();
      }
    },
  },
  data() {
    return {
      pokemonList: {},
      generationId: null,
    };
  },
  mounted() {
    this.generationId = this.$route.params.id;
    this.fetchList();
  },
  methods: {
    fetchList() {
      getPokemonList().then(res => {
        console.log(res);
        const { results } = res;
        console.log(results);
      });
    },
  },
};
</script>
