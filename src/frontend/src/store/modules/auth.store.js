import { SET_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";
import user from "@/static/user.json";

const entity = "auth";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    user: null,
  },
  actions: {
    login({ commit }) {
      const data = user; // TODO: Add api call

      commit(
        SET_ENTITY,
        {
          module,
          entity: "user",
          value: data,
        },
        { root: true }
      );
    },
  },
};
