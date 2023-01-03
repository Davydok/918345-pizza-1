import pizzaOptions from "@/static/pizza.json";
import {
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

const resetPizza = () => ({
  size: 1,
  dough: 1,
  sauce: 1,
  ingredients: pizzaOptions.ingredients.map(({ id }) => ({
    id,
    number: 0,
  })),
  pizzaName: "",
  id: uniqueId(),
});

export default {
  namespaced: true,
  state: {
    pizza: pizzaOptions,
    product: resetPizza(),
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
    [RESET_PRODUCT]({ product }) {
      Object.assign(product, resetPizza());
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
  actions: {},
};
