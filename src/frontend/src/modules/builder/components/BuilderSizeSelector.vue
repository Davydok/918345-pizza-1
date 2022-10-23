<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizza.sizes"
          :key="`size-${size.id}`"
          class="diameter__input"
          :class="`diameter__input--${slugSize(size)}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.id"
            class="visually-hidden"
            :checked="size.id == buildedPizza.size"
            @click="setSize(size.id)"
          />
          <span>
            {{ size.name }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapState("Builder", ["pizza", "buildedPizza"]),
  },
  methods: {
    ...mapMutations("Builder", ["setSize"]),
    slugSize({ name }) {
      switch (name) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        case "45 см":
          return "big";
        default:
          return "";
      }
    },
  },
};
</script>
