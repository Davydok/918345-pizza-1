<template>
  <div>
    <AppLayoutHeader :cart-price="cartPrice" />
    <main class="layout">
      <div class="layout__sidebar sidebar"></div>
      <div class="layout__content"></div>
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutLayout",
  components: {
    AppLayoutHeader,
  },
  props: {
    cartPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>
