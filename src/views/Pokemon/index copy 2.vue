<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  ul.list--gallery
    li.item__cell(
      v-for="(item, index) in pokemons"
      :key="'poke'+index"
      )
      span {{ item.name }}
    //-   a(href="javascript:;" title="모달" class="item__cell--thumb" @click="pokeDetail(pokemon.id)")
        img(:src="imageUrl + pokemon.id + '.png'" width="96" height="96" alt="")
        em(class="item__cell--badge") {{ pokemon.id }}
        span {{ pokemon.name }}

      //- a(href="javascript:;" title="모달" class="item__cell--thumb" @click="pokeViewDetail(pokemon.url)") #[img(:src="imageUrl + pokemon.id + '.png'" width="96" height="96" alt="")]
      //- a(href="javascript:;" title="상세" class="item__cell--title" @click="pokeDetail(pokemon.id)") {{ pokemon.name }}
    //- li(id="infinite-scroll" ref="infinitescroll")
      font-awesome-icon(:icon="['fas', 'spinner']" spin)
  div(id="infinite-scroll" v-show="loading")
    font-awesome-icon(:icon="['fas', 'spinner']" spin)
  .btn-area.center
    el-button(name="button" @click="moreView()") MORE

</template>

<script>
// import { getPokemonPageList } from "@/api/index.js";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pokemonDetail from "./pokemonDetail";

export default {
  name: "MyPokemonList",
  components: {
    FontAwesomeIcon,
    pokemonDetail,
  },

  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      currentUrl: "",
      nextUrl: "",
      pokemons: [],
      pokemon: "",
      show: false,
      loading: false,
      isDelay: false,
      page: 1,
    };
  },
  methods: {
    fetchList() {
      this.loading = true;
      // getPokemonPageList()
      let req = new Request(this.currentUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            console.log(`200`);
            const { data } = res;
            console.log(data);
            this.pokemons = data.results;
            this.nextUrl = data.next;
            // this.$store.commit("SET_POKEMON_COUNT", data);
            this.$store.commit("SET_POKEMON_LIST", {
              pageParams: 20,
              pages: data,
            });

            // https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20

            // this.nextUrl = data.next;
            // data.results.forEach(pokemon => {
            //   pokemon.id = pokemon.url
            //     .split("/")
            //     .filter(function (pokemonId) {
            //       return pokemonId;
            //     })
            //     .pop();
            //   this.pokemons.push(pokemon);
            // });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    moreView() {
      this.currentUrl = this.nextUrl;
      this.fetchList();
      console.log(this.currentUrl);
    },

    async addList() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log(`${window.innerHeight + window.scrollY} >= ${document.body.offsetHeight}`);
        this.loading = true;
        if (!this.isDelay) {
          this.isDelay = true;

          var formData = new FormData();
          formData.append("currPage", this.page);
          formData.append("pageSize", "20");

          const { data } = await this.$store.dispatch("FETCH_GET_POKEMON_LIST", formData);
          console.log(` :::::::::::::::::::: addList :::::::::::::::: data `);
          console.log(data);

          // console.log(data.results.length);
          // if (data.results.length) {
          //   this.page += 1;
          //   this.$store.commit("SET_POKEMON_LIST", data);
          // }
          // setTimeout(() => {
          //   this.isDelay = false;
          //   this.loading = false;
          // }, 5000);
        }
        // console.log(this.$store.state);
      }
    },

    autoScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log(` :::::::::::::::::: Auto Scroll :::::::::::::::::: `);
        console.log(`${window.innerHeight + window.scrollY} >= ${document.body.offsetHeight}`);
      }
    },

    next() {
      this.currentUrl = this.nextUrl;
      this.fetchList();
    },
  },
  created() {
    this.currentUrl = this.nextUrl;
    this.fetchList();
  },
  mounted() {},
};
</script>
