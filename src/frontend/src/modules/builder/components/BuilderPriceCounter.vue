<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!isReady"
      @click="addPizzaToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { RESET_PIZZA, ADD_TO_CART } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", ["pizza", "buildedPizza"]),
    isReady() {
      return this.buildedPizza.pizzaName && this.ingredientsPrice;
    },
    pizzaPrice() {
      return (
        this.getPizzaParametr("sizes", this.buildedPizza.size).multiplier *
        (this.getPizzaParametr("dough", this.buildedPizza.dough).price +
          this.getPizzaParametr("sauces", this.buildedPizza.sauce).price +
          this.ingredientsPrice)
      );
    },
    ingredientsPrice() {
      return this.buildedPizza.ingredients.reduce(
        (price, { id, number }) =>
          price + number * this.getPizzaParametr("ingredients", id).price,
        0
      );
    },
  },
  methods: {
    ...mapMutations("Builder", [RESET_PIZZA]),
    ...mapMutations("Cart", [ADD_TO_CART]),
    getPizzaParametr(name, searchId) {
      return this.pizza[name].find(({ id }) => id == searchId);
    },
    addPizzaToCart() {
      this[ADD_TO_CART]({
        buildedPizza: this.buildedPizza,
        pizzaPrice: this.pizzaPrice,
      });
      this[RESET_PIZZA]();
    },
  },
};
</script>
