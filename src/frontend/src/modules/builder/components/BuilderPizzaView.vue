<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="product.pizzaName"
        @input="setPizzaName($event.target.value)"
      />
    </label>

    <AppDrop @drop="setIngredient($event)">
      <div class="content__constructor">
        <div :class="`pizza pizza--foundation--${foundation}`">
          <div class="pizza__wrapper">
            <template v-for="ingredient in filteredIngredients">
              <div
                :key="`${ingredient.id}--first`"
                :class="`pizza__filling pizza__filling--${slugIngredient(
                  ingredient.id
                )}`"
              ></div>
              <div
                v-if="ingredient.number > 1"
                :key="`${ingredient.id}--second`"
                :class="[
                  `pizza__filling pizza__filling--${slugIngredient(
                    ingredient.id
                  )}`,
                  'pizza__filling--second',
                ]"
              ></div>
              <div
                v-if="ingredient.number > 2"
                :key="`${ingredient.id}--third`"
                :class="[
                  `pizza__filling pizza__filling--${slugIngredient(
                    ingredient.id
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
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  SET_PRODUCT_NAME,
  SET_INGREDIENT,
  SET_PRODUCT,
  RESET_PRODUCT,
} from "@/store/mutations-types";

export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter },
  computed: {
    ...mapState("Builder", ["pizza", "product"]),
    ...mapGetters("Builder", ["ingredientById", "doughById", "sauceById"]),
    foundation() {
      return `${this.slugDough(
        this.doughById(this.product.dough)
      )}-${this.slugSauce(this.sauceById(this.product.sauce))}`;
    },
    filteredIngredients() {
      return this.product.ingredients.filter(({ number }) => number > 0);
    },
  },
  created() {
    const product = this.$route.params.product;
    if (product) {
      this.setProduct(product);
    } else {
      this.resetProduct(product);
    }
  },
  methods: {
    ...mapMutations("Builder", {
      setPizzaName: SET_PRODUCT_NAME,
      setIngredient: SET_INGREDIENT,
      setProduct: SET_PRODUCT,
      resetProduct: RESET_PRODUCT,
    }),
    slugIngredient(id) {
      return this.ingredientById(id)
        .image.replace("/public/img/filling/", "")
        .replace(".svg", "");
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
