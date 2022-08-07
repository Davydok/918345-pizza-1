<template>
  <div>
    <AppLayoutHeader :cart-price="cartPrice" />
    <main class="content">
      <IndexHome @addToCart="addToCart" />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import IndexHome from "@/views/Index";

export default {
  name: "AppLayout",
  components: {
    AppLayoutHeader,
    IndexHome,
  },
  props: {},
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    cartPrice() {
      return this.cart.reduce(
        (price, { pizzalPrice }) => price + pizzalPrice,
        0
      );
    },
  },
  methods: {
    addToCart(pizza) {
      this.cart.push(pizza);
    },
  },
};
</script>
