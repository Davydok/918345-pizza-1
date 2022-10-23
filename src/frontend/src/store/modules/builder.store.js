import pizzaOptions from "@/static/pizza.json";
import { RESET_PIZZA } from "@/store/mutations-types";

const resetPizza = () => ({
  size: 1,
  dough: 1,
  sauce: 1,
  ingredients: pizzaOptions.ingredients.map(({ id }) => ({
    id,
    number: 0,
  })),
  pizzaName: "",
});

export default {
  namespaced: true,
  state: {
    pizza: pizzaOptions,
    buildedPizza: resetPizza(),
  },
  getters: {},
  mutations: {
    [RESET_PIZZA]({ buildedPizza }) {
      Object.assign(buildedPizza, resetPizza());
    },
    setDough({ buildedPizza }, dough) {
      buildedPizza.dough = dough;
    },
    setPizzaName({ buildedPizza }, pizzaName) {
      buildedPizza.pizzaName = pizzaName;
    },
    setSize({ buildedPizza }, size) {
      buildedPizza.size = size;
    },
    setSauce({ buildedPizza }, sauce) {
      buildedPizza.sauce = sauce;
    },
    addIngredient({ buildedPizza }, { id }) {
      buildedPizza.ingredients[id - 1].number++;
    },
    setIngredientNumber({ buildedPizza }, { index, number }) {
      buildedPizza.ingredients[index].number = number;
    },
  },
  actions: {},
};
