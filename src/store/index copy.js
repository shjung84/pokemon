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
    // state를 변경
    SET_POKEMON_LIST(state, payload) {
      // state.pageParams = payload.pageParams;
      state.pageParams = state.pageParams.concat(payload.pageParams);
      state.pages = state.pages.concat(payload.pages);
      console.log(` :::::::::::::::::::: store :::::::::::::::::: state.pages`);
      console.log(state);
    },
  },
  actions: {
    // mutations을 실행
    FETCH_GET_POKEMON_LIST(context, payload) {
      // console.log(context);
      // console.log(payload);
      console.log(context.state);
      return getPokemonPageList(payload).then(res => res);
    },
  },
  modules: {},
});
