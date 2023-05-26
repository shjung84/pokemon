<style lang="scss" scoped>
.category {
  margin-bottom: 30px;
  ul {
    text-align: center;
    li {
      /* display: inline-block; */
      margin: 3px 5px;
      a {
        display: block;
        padding: 2px 10px;
        background-color: #666;
        color: $color-bg;
        @include border-radius(4px);
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

<template lang="pug">
.wrap
  .test-area
    span [ total :: {{ this.form.totalCount }} ]
    span &nbsp;,&nbsp;
    span [ length :: {{ generationList.length }} ]
  //- ul.list--gallery(@scroll="checkSize")
  .category
    ul
      li(v-for="(item, index) of generationList")
        a(href="javascript:;" @click="category(index + 1)") [{{ index + 1 }}] {{ item.name }} #[p {{ item.url }}]
  ul.list--gallery
    //- li.item__cell(v-for="item of list")
    //-   a(href="javascript:;" class="item__cell--thumb" @click="pokeDetail(item.id)")
    //-     img(:src="imageUrl + item.id + '.png'" width="96" height="96" alt="")
    //-     em(class="item__cell--badge") #[i #]{{ item.id }}
    //-     span {{ item.name }}
    li.item__cell(v-for="(item) of pokemonList")
      a(href="javascript:;" class="item__cell--thumb")
        span {{ item.name }}


  //- .btn-area.center
  //-   el-button(name="button" @click="next") MORE

</template>

<script>
// import { getPokemonPageList } from "@/api/index.js";
import { getGenerationList } from "@/api/index.js";
// import { getPokemonList } from "@/api/index.js";

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
        console.log(newVal);
        console.log(oldVal);
        this.fetchList();
      }
    },
  },

  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",

      spinner: false,
      list: [],
      generationList: [],
      pokemonList: [],
      form: {
        generation: 1,
        row: 20,
        totalCount: 0,
        first: true,
      },
    };
  },
  methods: {
    fetchList() {
      this.spinner = true;
      getGenerationList(this.form).then(res => {
        const { count, results } = res;
        console.log(res);
        this.form.totalCount = count;
        this.generationList = results;
        console.log(this.generationList.length);
      });

      // getPokemonPageList(this.form).then(res => {
      //   const { count, results } = res;
      //   this.form.totalCount = count;
      //   this.list = this._.concat(
      //     this.list,
      //     results.map(item => {
      //       item.id = item.url
      //         .split("/")
      //         .filter(item => item)
      //         .pop();
      //       return item;
      //     })
      //   );

      //   if (this.form.first) {
      //     // 스크롤이동
      //     this.form.first = false;
      //   }
      // });
    },

    fetchData(index) {
      getGenerationList().then(res => {
        const { results } = res;
        console.log(index);
        console.log(results);
        this.form.generation = index;
        console.log(this.form.generation);
        this.$router.push({ query: { generation: this.form.generation } });
      });
    },
    next() {
      this.form.page++;
      this.$router.replace({ query: { page: this.form.page } });
    },
    category(index) {
      console.log(`category :: ${index}`);
      this.newUrl = "https://pokeapi.co/api/v2/generation/" + index;

      console.log(this.newUrl);

      let req = new Request(this.newUrl);
      fetch(req)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.pokemonList = data.pokemon_species;
          console.log(this.pokemonList);
          for (let i = 0; i <= this.pokemonList.length; i++) {
            console.log(this.pokemonList[i].name, this.pokemonList[i].url);
          }
        });
    },
    pokeDetail(id) {
      this.$router.push(`/detail/${id}`).catch(() => {});
    },
  },
  created() {},
  mounted() {
    if (!this._.isEmpty(this.$route.query)) {
      this.form.generation = this.$route.query.generation;
    }
    this.fetchList();
  },
};
</script>
