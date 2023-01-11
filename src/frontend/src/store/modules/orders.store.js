import { SET_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "orders";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    deliveryOption: 1,
    checkout: false,
  },
  actions: {
    setDeliveryOption({ commit }, deliveryOptionId) {
      commit(
        SET_ENTITY,
        {
          module,
          entity: "deliveryOption",
          value: deliveryOptionId,
        },
        { root: true }
      );
    },
    checkout({ commit }) {
      commit(
        SET_ENTITY,
        {
          module,
          entity: "checkout",
          value: true,
        },
        { root: true }
      );
    },
    confirm({ commit, dispatch }) {
      commit(
        SET_ENTITY,
        {
          module,
          entity: "checkout",
          value: false,
        },
        { root: true }
      );
      dispatch("emptyCart", null, { root: true });
      this.$router.push({ name: "Home" });
    },
  },
};
