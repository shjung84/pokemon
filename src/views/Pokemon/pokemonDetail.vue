<style lang="scss" scoped></style>

<template lang="pug">
.modalpop__detail(v-if="show")
  .detail-view
    .detail-view__img(v-if="pokemon")
      img(:src="imageUrl + pokemon.id + '.png'" alt="")

    h3.detail-view__subject {{  pokemon.name }}

    .detail-view__data(v-if="pokemon")

      .detail-view__info
        .detail-view__info--inner
          ul.detail-view__info--list
            li
              strong Base Experience
              span {{ pokemon.base_experience }} XP
            li
              strong Height
              span {{ pokemon.height / 10 }} m
            li
              strong Weight
              span {{ pokemon.weight / 10 }} kg
        .detail-view__info--inner
          .poke-type__detail
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
                v-for="(value, index) in pokemon.types"
                :key="'value'+index"
                ) {{ value.type.name }}

    //- h3(v-else) The pokemon was not found
    .btn-box
      button(@click="closeDetail") Close
  //- .loader(v-else)
    //- font-awesome-icon(:icon="['fas', 'spinner']" spin)
</template>

<script>
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "pokemonDetail",
  props: ["pokemonUrl", "imageUrl"],
  components: {
    // FontAwesomeIcon,
  },
  data() {
    return {
      show: false,
      pokemon: {},
    };
  },
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) return res.json();
        })
        .then(data => {
          console.log(data);
          this.pokemon = data;
          this.show = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
