import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

Vue.use(Vuex);

// const state = () => ({
//   notifications: [],
//   users: []
// });

export default new Vuex.Store({
  // state,
  // actions,
  // mutations,
  // plugins: [VuexPlugins],
  modules,
});
