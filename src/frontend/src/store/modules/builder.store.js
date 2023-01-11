import {
  SET_ENTITY,
  RESET_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_NAME,
  SET_DOUGH,
  SET_SIZE,
  SET_SAUCE,
  SET_INGREDIENT_NUMBER,
  SET_INGREDIENT,
} from "@/store/mutations-types";
import { uniqueId } from "lodash";
import { capitalize } from "@/common/helpers";
import pizzaOptions from "@/static/pizza.json";

const entity = "builder";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    pizza: {},
    product: {},
  },
  getters: {
    doughById: (state) => (id) => {
      return state.pizza.dough.find((dough) => dough.id === id);
    },
    ingredientById: (state) => (id) => {
      return state.pizza.ingredients.find((ingredient) => ingredient.id === id);
    },
    sauceById: (state) => (id) => {
      return state.pizza.sauces.find((sauce) => sauce.id === id);
    },
    sizeById: (state) => (id) => {
      return state.pizza.sizes.find((size) => size.id === id);
    },
    productPrice(
      { product },
      { sizeById, doughById, sauceById, ingredientById }
    ) {
      return (
        sizeById(product.size).multiplier *
        (doughById(product.dough).price +
          sauceById(product.sauce).price +
          product.ingredients.reduce(
            (price, { id, number }) =>
              price + number * ingredientById(id).price,
            0
          ))
      );
    },
  },
  mutations: {
    [RESET_PRODUCT](state) {
      state.product = {
        size: state.pizza.sizes[0].id,
        dough: state.pizza.dough[0].id,
        sauce: state.pizza.sauces[0].id,
        ingredients: state.pizza.ingredients.map(({ id }) => ({
          id,
          number: 0,
        })),
        pizzaName: "",
        id: uniqueId(),
      };
    },
    [SET_PRODUCT]({ product }, predefinedProduct) {
      Object.assign(product, predefinedProduct);
    },
    [SET_PRODUCT_NAME]({ product }, pizzaName) {
      product.pizzaName = pizzaName;
    },
    [SET_DOUGH]({ product }, doughId) {
      product.dough = doughId;
    },
    [SET_SIZE]({ product }, sizeId) {
      product.size = sizeId;
    },
    [SET_SAUCE]({ product }, sauceId) {
      product.sauce = sauceId;
    },
    [SET_INGREDIENT]({ product }, { id }) {
      product.ingredients.find((ingredient) => ingredient.id === id).number++;
    },
    [SET_INGREDIENT_NUMBER]({ product }, { index, number }) {
      product.ingredients[index].number = number;
    },
  },
  actions: {
    query({ commit }) {
      const data = pizzaOptions; // TODO: Add api call

      commit(
        SET_ENTITY,
        {
          module,
          entity: "pizza",
          value: data,
        },
        { root: true }
      );

      commit(RESET_PRODUCT);
    },
  },
};
