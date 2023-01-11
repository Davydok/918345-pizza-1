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
      :class="{ [`counter__button--${buttonColor}`]: buttonColor }"
      :disabled="numberMax > 0 && number > numberMax - 1"
      @click="updateNumber(number + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
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
    buttonColor: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateNumber(value) {
      let isInvalidValue =
        isNaN(value) || (this.numberMax && value > this.numberMax) || value < 0;
      if (isInvalidValue) {
        return;
      }
      this.$emit("valueChanged", +value);
    },
  },
};
</script>
