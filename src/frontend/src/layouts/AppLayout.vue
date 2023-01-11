<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { DEFAULT_LAYOUT } from "@/common/constants";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
