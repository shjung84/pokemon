<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  ul.list--gallery
    li.item__cell(
      v-for="(pokemon, index) in pokemons"
      :key="'poke'+index"
      )
      a(href="javascript:;" title="모달" class="item__cell--thumb" @click="pokeDetail(pokemon.id)")
        img(:src="imageUrl + pokemon.id + '.png'" width="96" height="96" alt="")
        em(class="item__cell--badge") {{ pokemon.id }}
        span {{ pokemon.name }}

      //- a(href="javascript:;" title="모달" class="item__cell--thumb" @click="pokeViewDetail(pokemon.url)") #[img(:src="imageUrl + pokemon.id + '.png'" width="96" height="96" alt="")]
      //- a(href="javascript:;" title="상세" class="item__cell--title" @click="pokeDetail(pokemon.id)") {{ pokemon.name }}
    //- li(id="infinite-scroll" ref="infinitescroll")
      font-awesome-icon(:icon="['fas', 'spinner']" spin)
  div(id="infinite-scroll" v-show="loading")
    font-awesome-icon(:icon="['fas', 'spinner']" spin)
  pokemonDetail(
    v-if="show"
    :pokemonUrl="pokemonUrl"
    :imageUrl="imageUrl"
    @closeDetail="closeDetail"
  )
</template>

<script>
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
    };
  },
  methods: {
    fetchList() {
      let req = new Request(this.currentUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
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
        })
        .catch(error => {
          console.log(error);
        });
    },
    autoScroll() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next();
          }
        });
      });
      obs.observe(this.$refs.infinitescroll);
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchList();
    },
    pokeViewDetail(url) {
      console.log(url);
      this.pokemonUrl = url;
      this.show = true;
    },
    pokeDetail(id) {
      console.log(this.$router);
      this.$router.push(`/detail/${id}`).catch(() => {});
    },
    closeDetail() {
      this.show = false;
      this.searchValue = "";
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchList();
    this.autoScroll();
  },
  mounted() {
    this.autoScroll();
  },
};
</script>
