<template>
  <span class="filling" :class="`filling--${slugIngredient}`">
    {{ name }}
  </span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    slugIngredient() {
      return this.image.replace("/public/img/filling/", "").replace(".svg", "");
    },
  },
};
</script>
