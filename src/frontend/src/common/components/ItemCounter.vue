<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="number < 1"
      @click="number--"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" v-model="number" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="number > numberMax - 1"
      @click="number++"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    initNumber: {
      type: Number,
      default: 0,
    },
    numberMax: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      number: this.initNumber,
    };
  },
  watch: {
    initNumber(curr) {
      this.number = curr;
    },
    number(curr, prev) {
      if (isNaN(+curr) || +curr > this.numberMax || +curr < 0) {
        this.number = prev;
      } else {
        this.number = +curr;
        this.$emit("valueChanged", +this.number);
      }
    },
  },
  methods: {},
};
</script>
