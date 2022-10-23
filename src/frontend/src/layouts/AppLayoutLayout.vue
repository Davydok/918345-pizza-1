<template>
  <div>
    <AppLayoutHeader />
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
};
</script>
