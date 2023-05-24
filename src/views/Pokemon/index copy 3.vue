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
  font-size: 30px;
}
/* .list--gallery {
  height: calc(100vh - 50px);
  overflow-y: auto;
  border: 5px solid #000;
} */
</style>

<template lang="pug">
.wrap
  .test-area {{ pokemons.length }}
  //- ul.list--gallery(@scroll="checkSize")
  ul.list--gallery
    li.item__cell(
      v-for="(pokemon, index) in pokemons"
      :key="'poke'+index"
      )
      //- span {{ item.name }}
      a(href="javascript:;" title="모달" class="item__cell--thumb" @click="pokeDetail(pokemon.id)")
        img(:src="imageUrl + pokemon.id + '.png'" width="96" height="96" alt="")
        em(class="item__cell--badge") {{ pokemon.id }}
        span {{ pokemon.name }}
  //- div(id="infinite-scroll" ref="infinitescroll" :class="{'spinner-show': spinner}")
    p.spinner(v-show="spinner")
      font-awesome-icon(:icon="['fas', 'spinner']" spin)
  //- div(id="infinite-scroll" ref="infinitescroll")
  //-   font-awesome-icon(:icon="['fas', 'spinner']" spin)
  .btn-area.center
    el-button(name="button" @click="next") MORE

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
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      currentUrl: "",
      nextUrl: "",
      pokemons: [],
      pokemon: "",
      loadCount: 20,
      spinner: false,
    };
  },
  methods: {
    fetchList() {
      this.spinner = true;
      // getPokemonPageList()
      let req = new Request(this.currentUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            // console.log(`200`);
            return res.json();
          }
        })
        .then(data => {
          console.log(data);
          // this.pokemons = data.results;
          this.nextUrl = data.next;

          data.results.forEach(pokemon => {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (pokemonId) {
                return pokemonId;
              })
              .pop();
            this.pokemons.push(pokemon);
          });

          this.$store.commit("SET_POKEMON_LIST", {
            pageParams: this.loadCount,
            pages: data,
          });

          this.loadCount += 20;
          this.spinner = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    autoScroll() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          console.log(`entry.intersectionRatio :: ${entry.intersectionRatio}`);
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.spinner = true;
            console.log(`autoScroll :: next`);
            setTimeout(() => {
              this.next();
            }, 3000);
            // this.spinner = false;
          } else if (entry.intersectionRatio == 1) {
            console.log(`autoScroll :: 1 true`);
            // this.spinner = true;
          } else {
            console.log(`autoScroll ::  false`);
            // this.spinner = false;
          }
        });
      });
      obs.observe(this.$refs.infinitescroll);
    },
    async checkSize() {
      console.log(` :::::::::::::::::: Auto Scroll :::::::::::::::::: `);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log(`${window.innerHeight + window.scrollY} >= ${document.body.offsetHeight}`);
        // this.next();
      } else {
        console.log(`${window.innerHeight + window.scrollY} >= ${document.body.offsetHeight}`);
      }
    },

    next() {
      this.spinner = true;
      this.currentUrl = this.nextUrl;
      this.fetchList();
    },
    pokeDetail(id) {
      console.log(this.$router);
      this.$router.push(`/detail/${id}`).catch(() => {});
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
  },
  mounted() {
    this.fetchList();
    // this.autoScroll();
    this.checkSize();
  },
};
</script>
