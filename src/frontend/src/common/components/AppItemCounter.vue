<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="number < 1"
      @click="updateNumber(number - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="number"
      @change="updateNumber($event.target.value)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="number > numberMax - 1"
      @click="updateNumber(number + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { INGREDIENT_NUMBER_MAX } from "@/common/constants";

export default {
  name: "AppItemCounter",
  props: {
    number: {
      type: Number,
      default: 0,
    },
    numberMax: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    updateNumber(value) {
      const isValidValue =
        isNaN(value) || value > INGREDIENT_NUMBER_MAX || value < 0;
      if (isValidValue) {
        return;
      }
      this.$emit("valueChanged", +value);
    },
  },
};
</script>
