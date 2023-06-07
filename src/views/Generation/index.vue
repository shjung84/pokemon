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
  h2.title #[mdicon(name="note-text-outline")] #[span {{ names }}]
  .list--gallery
    ul
      li.item__cell(v-for="item of list")
        a(href="javascript:;" class="item__cell--thumb" @click="pokeDetail(item.id)")
          img(:src="imageUrl + item.id + '.png'" width="96" height="96" alt="")
          em(class="item__cell--badge") #[i #]{{ item.id }}
          span {{ item.name }}
</template>

<script>
export default {
  name: "MyPokemonList",
  props: {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "url",
    },
  },
  computed: {},
  watch: {
    $route(newVal, oldVal) {
      if (newVal.path !== oldVal.path) {
        this.form.page = this.$route.params.page;
        this.fetchList();
      }
    },
  },
  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/generation/",
      currentUrl: "",
      generationList: {},
      list: {},
      names: "",
      form: {
        page: null,
      },
    };
  },
  mounted() {
    this.form.page = this.$route.params.page;
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.currentUrl = this.apiUrl + this.$route.params.page;
      let req = new Request(this.currentUrl);
      fetch(req)
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.names = this._.find(data.names, { language: { name: "ko" } }).name;
          this.list = data.pokemon_species.map(item => {
            item.id = item.url
              .split("/")
              .filter(item => item)
              .pop();
            return item;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    pokeDetail(id) {
      this.$router.push(`detail/${id}`).catch(() => {});
    },
  },
};
</script>
