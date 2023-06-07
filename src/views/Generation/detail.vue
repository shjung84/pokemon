<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  h2.title {{ title }}
  .wrap-inner
    .detail-view()
      .basic-info
        //- .basic-info__img(v-loading="loading")
        .basic-info__img()
          img(v-if="imgUrl" :src="imgUrl" alt="")
          .loader(v-else)
            font-awesome-icon(:icon="['fas', 'spinner']" spin)
          //- mdicon( name="alert-circle" size="30")
          //- mdicon(v-else name="alert-circle" size="30")
        .basic-info__box
          h3 {{ pokemon.name }}
          .basic-list
            dl
              dt Base Experience
              dd {{ pokemon.base_experience }} XP
            dl
              dt Height
              dd {{ pokemon.height / 10 }} m
            dl
              dt Weight
              dd {{ pokemon.weight / 10 }} kg
      .basic-list.poke-type
        dl
          dt Pokemon Types
          dd.type
            span(
            v-for="(value, index) in pokemon.types"
            :key="'value'+index"
            ) {{ value.type.name }}
        dl
          dt Abilities
          dd.ability
            span(
            v-for="(value, index) in pokemon.abilities"
            :key="'value'+index"
            ) {{ value.ability.name }}
    .btn-area
      .left
        el-button button

      .right
        el-button button

</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "pokemonDetail",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: { FontAwesomeIcon },
  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemon: {},
      imgUrl: "",
      loading: true,
    };
  },
  mounted() {},
  methods: {
    fetchData() {
      this.loading = true;
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) return res.json();
        })
        .then(data => {
          this.pokemon = data;
          this.imgUrl = this.imageUrl + data.id + ".png";
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created() {
    this.pokemonUrl = this.apiUrl + this.$route.params.id;
    this.fetchData();
  },
};
</script>
