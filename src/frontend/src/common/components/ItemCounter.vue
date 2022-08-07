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
      :disabled="number > 2"
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
    ingredientNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      number: this.ingredientNumber,
    };
  },
  watch: {
    ingredientNumber(curr) {
      this.number = curr;
    },
    number(curr, prev) {
      if (isNaN(+curr) || +curr > 3 || +curr < 0) {
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
