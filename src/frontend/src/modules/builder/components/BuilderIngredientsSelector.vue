<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in pizza.sauces"
            :key="`sauce-${sauce.id}`"
            class="radio ingredients__input"
            :value="sauce.id"
            name="sauce"
            :title="sauce.name"
            :checked="sauce.id == buildedPizza.sauce"
            @click="$emit('sauceSelected', sauce.id)"
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
                  buildedPizza.ingredients[index].number < ingredientNumberMax
                "
              >
                <SelectorItem
                  :name="ingredient.name"
                  :image="ingredient.image"
                />
              </AppDrag>

              <ItemCounter
                class="ingredients__counter"
                :number="buildedPizza.ingredients[index].number"
                :number-max="ingredientNumberMax"
                @valueChanged="$emit('changedIngredientNumber', index, $event)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import AppDrag from "@/common/components/AppDrag";
import { INGREDIENT_NUMBER_MAX } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, RadioButton, SelectorItem, AppDrag },
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
      ingredientNumberMax: INGREDIENT_NUMBER_MAX,
    };
  },
  methods: {},
};
</script>
