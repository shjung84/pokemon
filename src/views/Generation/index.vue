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
  .test-area
    span [ total :: {{ this.form.totalCount }} ]
    span &nbsp;,&nbsp;
    span [ length :: {{ generationList.length }} ]
  //- ul.list--gallery(@scroll="checkSize")
  .category
    ul
      li(v-for="(item, index) of generationList" :class="{'is-active' : index + 1 == form.page}")
        a(href="javascript:;" @click="fetchData(index+1, item.url)") [{{ index + 1 }}] {{ item.name }}
  .list--gallery
    ul
      li.item__cell(v-for="item of pokemonList")
        a(href="javascript:;" class="item__cell--thumb" @click="pokeDetail(item.id)")
          img(:src="imageUrl + item.id + '.png'" width="96" height="96" alt="")
          em(class="item__cell--badge") #[i #]{{ item.id }}
          span {{ item.name }}

    //- li.item__cell(v-for="item of pokemonList")
    //-   a(href="javascript:;" class="item__cell--thumb")
    //-     span id : {{ item.id }}
    //-     span name : {{ item.name }}

</template>

<script>
// import { getPokemonPageList } from "@/api/index.js";
import { getGenerationList } from "@/api/index.js";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "MyPokemonList",
  props: {
    title: {
      type: String,
      default: "",
    },
  },

  components: {
    FontAwesomeIcon,
  },

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
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      generationList: [],
      poke: {
        height: "",
      },
      list: {},
      pokemonList: {},
      form: {
        page: 1,
        totalCount: 0,
      },
    };
  },
  methods: {
    fetchList() {
      getGenerationList(this.form).then(res => {
        // console.log(res);
        const { count, results } = res;
        this.form.totalCount = count;
        this.generationList = results;
        console.log(` `);
        console.log(`this.$route.query.page :: ${this.$route.query.page}`);
        console.log(` `);
        // if (this.$route.query.page !== undefined) {
        //   this.$route.query.page = this.form.page;
        //   this.index = this.form.page;
        //   this.url = this.generationList[this.$route.query.page - 1].url;
        // } else {
        //   this.index = this.form.page;
        //   this.url = this.generationList[0].url;
        // }

        // this.fetchData(this.index, this.url);
      });
    },

    fetchData(index, url) {
      console.log(`   fetchData :: index : ${index}, url : ${url}`);
      this.newUrl = url;

      let req = new Request(this.newUrl);
      fetch(req)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          this.pokemonList = data.pokemon_species;
          this.pokemonList.map(item => {
            item.id = item.url
              .split("/")
              .filter(item => item)
              .pop();
            return item;
          });
          this.pokemonList.sort((a, b) => a.id - b.id);
        });
    },

    cellClick(index, url) {
      console.log(`cellCLick :: ${index}, ${url}`);
      // const query = {
      //   ...this.$route.query,
      //   page: item.cmmnGroupCodeNo,
      // }
      // this.$router.push({ query }).catch(() => {})
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
