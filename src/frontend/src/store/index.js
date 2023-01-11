import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import { SET_ENTITY } from "@/store/mutations-types";

Vue.use(Vuex);

// const state = () => ({
//   notifications: [],
//   users: []
// });

const actions = {
  async init({ dispatch }) {
    dispatch("Cart/query");
    dispatch("Builder/query");
  },
};

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
};

export default new Vuex.Store({
  // state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules,
});
