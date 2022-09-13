<template>
  <component
    :is="layout"
    :cartPrice="cartPrice"
    @addToCart="$emit('addToCart', $event)"
  >
    <slot />
  </component>
</template>

<script>
import { DEFAULT_LAYOUT } from "@/common/constants";

export default {
  name: "AppLayout",
  props: {
    cartPrice: {
      type: Number,
      required: true,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
