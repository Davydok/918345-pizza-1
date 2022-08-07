<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector
        :pizza="pizza"
        :builded-pizza="buildedPizza"
        @doughSelected="setDough"
      />

      <BuilderSizeSelector
        :pizza="pizza"
        :builded-pizza="buildedPizza"
        @sizeSelected="setSize"
      />

      <BuilderIngredientsSelector
        :pizza="pizza"
        :builded-pizza="buildedPizza"
        @sauceSelected="setSauce"
        @changedIngredientNumber="setIngredientNumber"
      />

      <BuilderPizzaView
        :pizza="pizza"
        :builded-pizza="buildedPizza"
        @changedPizzaName="setPizzaName"
        @addToCart="addToCart"
        @addIngredient="addIngredient"
      />
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  components: {
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      pizza,
      buildedPizza: {},
    };
  },
  created() {
    this.resetPizza();
  },
  methods: {
    setDough(dough) {
      this.buildedPizza.dough = dough;
    },
    setSauce(sauce) {
      this.buildedPizza.sauce = sauce;
    },
    setSize(size) {
      this.buildedPizza.size = size;
    },
    setPizzaName(pizzaName) {
      this.buildedPizza.pizzaName = pizzaName;
    },
    setIngredientNumber(index, number) {
      this.buildedPizza.ingredients[index].number = number;
    },
    addIngredient({ id }) {
      this.buildedPizza.ingredients[id - 1].number++;
    },
    addToCart(pizza) {
      this.$emit("addToCart", pizza);
      this.resetPizza();
    },
    resetPizza() {
      this.buildedPizza = {
        size: 1,
        dough: 1,
        sauce: 1,
        ingredients: pizza.ingredients.map(({ id }) => ({
          id,
          number: 0,
        })),
        pizzaName: "",
      };
    },
  },
};
</script>

<style lang="scss"></style>
