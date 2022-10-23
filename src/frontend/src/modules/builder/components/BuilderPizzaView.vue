<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="buildedPizza.pizzaName"
        @input="setPizzaName($event.target.value)"
      />
    </label>

    <AppDrop @drop="addIngredient($event)">
      <div class="content__constructor">
        <div :class="`pizza pizza--foundation--${foundation}`">
          <div class="pizza__wrapper">
            <template v-for="ingredient in filteredIngredients">
              <div
                :key="`${ingredient.id}--first`"
                :class="`pizza__filling pizza__filling--${slugIngredient(
                  getIngredient(ingredient.id)
                )}`"
              ></div>
              <div
                v-if="ingredient.number > 1"
                :key="`${ingredient.id}--second`"
                :class="[
                  `pizza__filling pizza__filling--${slugIngredient(
                    getIngredient(ingredient.id)
                  )}`,
                  'pizza__filling--second',
                ]"
              ></div>
              <div
                v-if="ingredient.number > 2"
                :key="`${ingredient.id}--third`"
                :class="[
                  `pizza__filling pizza__filling--${slugIngredient(
                    getIngredient(ingredient.id)
                  )}`,
                  'pizza__filling--third',
                ]"
              ></div>
            </template>
          </div>
        </div>
      </div>
    </AppDrop>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter },
  computed: {
    ...mapState("Builder", ["pizza", "buildedPizza"]),
    foundation() {
      return `${this.slugDough(
        this.pizza.dough[this.buildedPizza.dough - 1]
      )}-${this.slugSauce(this.pizza.sauces[this.buildedPizza.sauce - 1])}`;
    },
    filteredIngredients() {
      return this.buildedPizza.ingredients.filter(({ number }) => number > 0);
    },
  },
  methods: {
    ...mapMutations("Builder", ["setPizzaName", "addIngredient"]),
    getIngredient(searchId) {
      return this.pizza.ingredients.find(({ id }) => id == searchId);
    },
    slugIngredient({ image }) {
      return image.replace("/public/img/filling/", "").replace(".svg", "");
    },
    slugDough({ name }) {
      switch (name) {
        case "Тонкое":
          return "small";
        case "Толстое":
          return "big";
        default:
          return "";
      }
    },
    slugSauce({ name }) {
      switch (name) {
        case "Томатный":
          return "tomato";
        case "Сливочный":
          return "creamy";
        default:
          return "";
      }
    },
  },
};
</script>
