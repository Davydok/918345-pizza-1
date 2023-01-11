<template>
  <div id="app">
    <AppLayout>
      <RouterView />
    </AppLayout>
    <AppPopup />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
