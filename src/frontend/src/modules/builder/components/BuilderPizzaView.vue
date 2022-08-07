<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaName"
        @input="$emit('changedPizzaName', pizzaName)"
      />
    </label>

    <AppDrop @drop="$emit('addIngredient', $event)">
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

    <BuilderPriceCounter
      :pizza="pizza"
      :builded-pizza="buildedPizza"
      @addToCart="addToCart"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter, AppDrop },
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
    return {
      pizzaName: this.buildedPizza.pizzaName,
    };
  },
  computed: {
    foundation() {
      return `${this.slugDough(
        this.pizza.dough[this.buildedPizza.dough - 1]
      )}-${this.slugSauce(this.pizza.sauces[this.buildedPizza.sauce - 1])}`;
    },
    filteredIngredients() {
      return this.buildedPizza.ingredients.filter(({ number }) => number > 0);
    },
  },
  watch: {
    buildedPizza() {
      this.pizzaName = this.buildedPizza.pizzaName;
    },
  },
  methods: {
    getIngredient(searchId) {
      return this.pizza.ingredients.find(({ id }) => id == searchId);
    },
    addToCart(pizza) {
      this.$emit("addToCart", pizza);
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
