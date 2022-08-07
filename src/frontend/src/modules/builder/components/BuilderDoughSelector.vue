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
            :value="slugDough(dough)"
            class="visually-hidden"
            :checked="dough.id == buildedPizza.dough"
            @click="$emit('doughSelected', dough.id)"
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
export default {
  name: "BuilderDoughSelector",
  components: {},
  props: {
    pizza: {
      type: Object,
      required: true,
    },
    buildedPizza: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
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
