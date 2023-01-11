<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <AppRadioButton
            v-for="sauce in pizza.sauces"
            :key="`sauce-${sauce.id}`"
            class="radio ingredients__input"
            :value="sauce.id"
            name="sauce"
            :title="sauce.name"
            :checked="sauce.id == product.sauce"
            @click="setSauce(sauce.id)"
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="(ingredient, index) in pizza.ingredients"
              :key="`ingredient-${ingredient.id}`"
              class="ingredients__item"
            >
              <AppDrag
                :transferData="ingredient"
                :draggable="
                  product.ingredients[index].number < ingredientNumberMax
                "
              >
                <AppSelectorItem
                  :name="ingredient.name"
                  :image="ingredient.image"
                />
              </AppDrag>

              <AppItemCounter
                class="ingredients__counter"
                :number="product.ingredients[index].number"
                :number-max="ingredientNumberMax"
                @valueChanged="setIngredientNumber({ index, number: $event })"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { INGREDIENT_NUMBER_MAX } from "@/common/constants";
import { mapState, mapMutations } from "vuex";
import { SET_SAUCE, SET_INGREDIENT_NUMBER } from "@/store/mutations-types";

export default {
  name: "BuilderIngredientsSelector",
  data() {
    return {
      ingredientNumberMax: INGREDIENT_NUMBER_MAX,
    };
  },
  computed: {
    ...mapState("Builder", ["pizza", "product"]),
  },
  methods: {
    ...mapMutations("Builder", {
      setSauce: SET_SAUCE,
      setIngredientNumber: SET_INGREDIENT_NUMBER,
    }),
  },
};
</script>
