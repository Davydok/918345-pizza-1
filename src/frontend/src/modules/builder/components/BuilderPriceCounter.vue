<template>
  <div class="content__result">
    <p>Итого: {{ pizzalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!isReady"
      @click="$emit('addToCart', { buildedPizza, pizzalPrice })"
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
    pizzalPrice() {
      return (
        this.pizza.sizes[this.buildedPizza.size - 1].multiplier *
        (this.pizza.dough[this.buildedPizza.dough - 1].price +
          this.pizza.sauces[this.buildedPizza.sauce - 1].price +
          this.ingredientsPrice)
      );
    },
    ingredientsPrice() {
      return this.buildedPizza.ingredients.reduce(
        (price, { id, number }) =>
          price + number * this.pizza.ingredients[id - 1].price,
        0
      );
    },
  },
  methods: {},
};
</script>
