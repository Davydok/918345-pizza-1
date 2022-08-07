<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!isReady"
      @click="$emit('addToCart', { buildedPizza, pizzaPrice })"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
    buildedPizza: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
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
    getPizzaParametr(name, searchId) {
      return this.pizza[name].find(({ id }) => id == searchId);
    },
  },
};
</script>
