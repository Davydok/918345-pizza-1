<template>
  <div class="content__result">
    <p>Итого: {{ $getFormatedPrice(productPrice) }}</p>
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
import { getFormatedPrice } from "@/common/mixins";
import { mapState, mapGetters, mapMutations } from "vuex";
import { RESET_PRODUCT, ADD_PIZZA_TO_CART } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",
  mixins: [getFormatedPrice],
  computed: {
    ...mapState("Builder", ["pizza", "product"]),
    ...mapGetters("Builder", ["productPrice"]),
    isReady() {
      return (
        this.product.pizzaName &&
        this.product.ingredients.some((ingredient) => ingredient.number > 0)
      );
    },
  },
  methods: {
    ...mapMutations("Builder", [RESET_PRODUCT]),
    ...mapMutations("Cart", [ADD_PIZZA_TO_CART]),
    getPizzaParametr(name, searchId) {
      return this.pizza[name].find(({ id }) => id == searchId);
    },
    addPizzaToCart() {
      this[ADD_PIZZA_TO_CART]({
        product: { ...this.product },
        price: this.productPrice,
        number: 1,
      });
      this[RESET_PRODUCT]();
    },
  },
};
</script>
