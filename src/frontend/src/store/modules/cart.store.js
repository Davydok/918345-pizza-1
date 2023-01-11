import {
  SET_ENTITY,
  ADD_PIZZA_TO_CART,
  SET_NUMBER_OF_PRODUCT,
  SET_ADDITIONAL_NUMBER,
  RESET_ADDITIONAL,
} from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";
import miscOptions from "@/static/misc.json";

const entity = "cart";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    cart: [],
    additional: [],
  },
  getters: {
    cartPrice({ cart, additional }) {
      const additionalPrice = additional.reduce(
        (additionalPrice, { price, number }) =>
          additionalPrice + price * number,
        0
      );
      const productsPrice = cart.reduce(
        (productsPrice, { price, number }) => productsPrice + price * number,
        0
      );
      return productsPrice + additionalPrice;
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
    [RESET_ADDITIONAL]({ additional }) {
      additional.forEach((item) => (item.number = 0));
    },
  },
  actions: {
    query({ commit }) {
      const data = miscOptions; // TODO: Add api call

      const value = data.map((item) => ({
        ...item,
        number: 0,
      }));

      commit(
        SET_ENTITY,
        {
          module,
          entity: "additional",
          value,
        },
        { root: true }
      );
    },
    emptyCart: {
      root: true,
      handler({ commit }) {
        commit(
          SET_ENTITY,
          {
            module,
            entity: "cart",
            value: [],
          },
          { root: true }
        );
        commit(RESET_ADDITIONAL);
      },
    },
  },
};
