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
      <RouterLink :to="{ name: 'Cart' }">{{
        $getFormatedPrice(cartPrice)
      }}</RouterLink>
    </div>
    <div class="header__user">
      <a href="#" class="header__login" @click="login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
import { getFormatedPrice } from "@/common/mixins";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppLayoutHeader",
  mixins: [getFormatedPrice],
  computed: {
    ...mapGetters("Cart", ["cartPrice"]),
  },
  methods: {
    ...mapActions("Auth", ["login"]),
  },
};
</script>
