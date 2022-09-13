<template>
  <div>
    <AppLayoutHeader :cart-price="cartPrice" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
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
