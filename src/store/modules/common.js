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
  setMenu({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getGenerationList(payload)
        .then(res => {
          console.log(res);
          const { params } = res;
          console.log(params);

          commit("SET_MENU", payload);
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
