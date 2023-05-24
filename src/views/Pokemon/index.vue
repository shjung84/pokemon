<style lang="scss" scoped>
.test-area {
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 50;
  padding: 20px;
  border: 1px solid #000;
  background-color: #fff;
  font-weight: 700;
  font-size: 20px;
}
/* .list--gallery {
  height: calc(100vh - 50px);
  overflow-y: auto;
  border: 5px solid #000;
} */
</style>

<template lang="pug">
.wrap
  .test-area
    p total :: {{ this.form.totalCount }}
    p length :: {{ list.length }}
  //- ul.list--gallery(@scroll="checkSize")
  ul.list--gallery
    li.item__cell(v-for="item of list")
      a(href="javascript:;" class="item__cell--thumb" @click="pokeDetail(item.id)")
        img(:src="imageUrl + item.id + '.png'" width="96" height="96" alt="")
        em(class="item__cell--badge") {{ item.id }}
        span {{ item.name }}
  .btn-area.center
    el-button(name="button" @click="next") MORE

</template>

<script>
import { getPokemonPageList } from "@/api/index.js";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pokemonDetail from "./pokemonDetail";

export default {
  name: "MyPokemonList",
  components: {
    FontAwesomeIcon,
    pokemonDetail,
  },

  watch: {
    "$route.query"(newVal, oldVal) {
      if (newVal.page !== oldVal.page) {
        this.fetchList();
      }
    },
  },

  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      spinner: false,
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
      this.spinner = true;
      getPokemonPageList(this.form).then(res => {
        console.log(`getPokemonPageList`);
        const { count, results } = res;
        console.log(res);
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

        if (this.form.first) {
          // 스크롤이동
          this.form.first = false;
        }
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
    this.fetchList();
  },
};
</script>
