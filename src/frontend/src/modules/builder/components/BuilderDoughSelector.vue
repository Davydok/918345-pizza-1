<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="dough in pizza.dough"
          :key="`dough-${dough.id}`"
          class="dough__input"
          :class="`dough__input--${slugDough(dough)}`"
        >
          <input
            type="radio"
            name="dought"
            :value="dough.id"
            class="visually-hidden"
            :checked="dough.id == buildedPizza.dough"
            @click="setDough(dough.id)"
          />
          <b>
            {{ dough.name }}
          </b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState("Builder", ["pizza", "buildedPizza"]),
  },
  methods: {
    ...mapMutations("Builder", ["setDough"]),
    slugDough({ name }) {
      switch (name) {
        case "Тонкое":
          return "light";
        case "Толстое":
          return "large";
        default:
          return "";
      }
    },
  },
};
</script>
