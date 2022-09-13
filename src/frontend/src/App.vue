<template>
  <div id="app">
    <AppLayout :cartPrice="cartPrice" @addToCart="addToCart">
      <RouterView :cartPrice="cartPrice" @addToCart="addToCart" />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    cartPrice() {
      return this.cart.reduce((price, { pizzaPrice }) => price + pizzaPrice, 0);
    },
  },
  methods: {
    addToCart(pizza) {
      this.cart.push(pizza);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
