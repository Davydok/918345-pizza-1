<template>
  <span class="filling" :class="`filling--${slugIngredient(ingredient)}`">
    {{ ingredient.name }}
  </span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    slugIngredient({ image }) {
      return image.replace("/public/img/filling/", "").replace(".svg", "");
    },
  },
};
</script>
