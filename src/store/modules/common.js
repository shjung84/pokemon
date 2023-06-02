import { getGenerationList } from "@/api/cmn";

const state = {
  menu: null,
};

const mutations = {
  SET_MENU: (state, menu) => {
    state.menu = menu;
  },
};

const actions = {
  setMenu({ commit }) {
    return new Promise((resolve, reject) => {
      getGenerationList()
        .then(res => {
          const { results } = res;
          const menu = results.map(item => {
            return {
              name: item.name,
              id: item.url
                .split("/")
                .filter(item => item)
                .pop(),
            };
          });
          commit("SET_MENU", menu);
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
