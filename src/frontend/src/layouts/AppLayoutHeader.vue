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
export default {
  name: "AppLayoutHeader",
  props: {
    cartPrice: {
      type: Number,
      dafault: 0,
    },
  },
};
</script>
