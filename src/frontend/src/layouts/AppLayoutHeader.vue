<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink :to="{ name: 'Home' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </RouterLink>
    </div>
    <div class="header__cart">
      <RouterLink :to="{ name: 'Cart' }">{{ cartPrice }} ₽</RouterLink>
    </div>
    <div class="header__user">
      <RouterLink :to="{ name: 'Login' }"><span>Войти</span></RouterLink>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Cart", ["cart"]),
    ...mapGetters("Cart", ["cartPrice"]),
  },
};
</script>
