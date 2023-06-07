<style lang="scss" scoped>
.test-area {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  padding: 20px;
  background-color: #fff;
  font-weight: 700;
  font-size: 20px;
}
</style>

<template lang="pug">
.wrap
  .test-area
    p total :: {{ this.form.totalCount }}
    p length :: {{ list.length }}
  //- ul.list--gallery(@scroll="checkSize")
  .list--gallery
    ul
      //- li.item__cell(v-for="item of list")
      li.item__cell(v-for="item of list")
        a(href="javascript:;" class="item__cell--thumb" @click="pokeDetail(item.id)")
          img(:src="imageUrl + item.id + '.png'" width="96" height="96" alt="")
          em(class="item__cell--badge") {{ item.id }}
          span {{ item.name }}
  .btn-area.center
    el-button(name="button" @click="next") MORE

</template>

<script>
import { getPokemonPageList } from "@/api/pokemon.js";

import pokemonDetail from "./pokemonDetail";

export default {
  name: "MyPokemonList",
  components: {
    pokemonDetail,
  },

  watch: {
    "$route.query"(newVal, oldVal) {
      if (newVal.page !== oldVal.page) {
        this.fetchList();
        console.log(`1`);
      } else {
        console.log(`2`);
      }
    },
  },

  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      list: [],
      form: {
        page: 1,
        row: 20,
        totalCount: 0,
        first: true,
      },
    };
  },
  methods: {
    fetchList() {
      getPokemonPageList(this.form).then(res => {
        console.log(`getPokemonPageList`);
        const { count, results } = res;

        this.form.totalCount = count;

        this.list = this._.concat(
          this.list,
          results.map(item => {
            item.id = item.url
              .split("/")
              .filter(item => item)
              .pop();
            return item;
          })
        );

        console.log(this.list);

        if (this.form.first) {
          // 스크롤이동
          this.form.first = false;
        }
        console.log(this.form.first);
      });
    },

    next() {
      this.form.page++;
      this.$router.replace({ query: { page: this.form.page } });
    },
    pokeDetail(id) {
      this.$router.push(`/detail/${id}`).catch(() => {});
    },
  },
  created() {},
  mounted() {
    if (!this._.isEmpty(this.$route.query)) {
      this.form.page = this.$route.query.page;
    }
    console.log(`this.form.page :: ${this.form.page}`);
    this.fetchList();
  },
};
</script>
