import { ADD_TO_CART } from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    cart: [],
  },
  getters: {
    cartPrice({ cart }) {
      return cart.reduce((price, { pizzaPrice }) => price + pizzaPrice, 0);
    },
  },
  mutations: {
    [ADD_TO_CART]({ cart }, pizza) {
      cart.push(pizza);
    },
  },
};
