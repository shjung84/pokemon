import Vue from "vue";
import Vuex from "vuex";
import { getPokemonPageList } from "@/api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageParams: [],
    pages: [],
  },
  getters: {},
  mutations: {
    SET_POKEMON_LIST(state, payload) {
      state.pageParams = state.pageParams.concat(payload.pageParams);
      state.pages = state.pages.concat(payload.pages);
      console.log(` :::::::::::::::::::: store :::::::::::::::::: state.pages`);
      console.log(state);
    },
  },
  actions: {
    setList({ commit }, payload) {
      commit("SET_POKEMON_LIST", payload);
    },
    FETCH_GET_POKEMON_LIST(context, payload) {
      console.log(context.state);
      return getPokemonPageList(payload).then(res => res);
    },
  },
  modules: {},
});
