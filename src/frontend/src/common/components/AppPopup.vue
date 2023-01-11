<template>
  <div v-if="checkout" class="popup">
    <a href="#" class="close" @click="confirm">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click="confirm">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppPopup",
  computed: {
    ...mapState("Orders", ["checkout"]),
  },
  methods: {
    ...mapActions("Orders", ["confirm"]),
  },
};
</script>
