import {
  ADD_PIZZA_TO_CART,
  SET_NUMBER_OF_PRODUCT,
  SET_ADDITIONAL_NUMBER,
} from "@/store/mutations-types";
import miscOptions from "@/static/misc.json";

const resetAdditional = () =>
  miscOptions.map(({ id }) => ({
    id,
    number: 0,
  }));

export default {
  namespaced: true,
  state: {
    cart: [],
    additional: resetAdditional(),
    misc: miscOptions,
  },
  getters: {
    cartPrice({ cart }) {
      return cart.reduce(
        (cartPrice, { price, number }) => cartPrice + price * number,
        0
      );
    },
    miscById: (state) => (id) => {
      return state.misc.find((item) => item.id === id);
    },
    additionalById: (state) => (id) => {
      return state.additional.find((item) => item.id === id);
    },
  },
  mutations: {
    [ADD_PIZZA_TO_CART]({ cart }, pizza) {
      const index = cart.findIndex(
        ({ product }) => product.id === pizza.product.id
      );
      if (~index) {
        cart.splice(index, 1, pizza);
      } else {
        cart.push(pizza);
      }
    },
    [SET_NUMBER_OF_PRODUCT]({ cart }, { index, number }) {
      cart[index].number = number;
    },
    [SET_ADDITIONAL_NUMBER]({ additional }, { id, number }) {
      additional.find((item) => item.id === id).number = number;
    },
  },
};
