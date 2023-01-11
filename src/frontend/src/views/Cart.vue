<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!cart.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <template v-else>
          <ul class="cart-list sheet">
            <li
              v-for="({ product, price, number }, index) in cart"
              :key="index"
              class="cart-list__item"
            >
              <div class="product cart-list__product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="Капричоза"
                />
                <div class="product__text">
                  <h2>{{ product.pizzaName }}</h2>
                  <ul>
                    <li>
                      {{ sizeById(product.size).name }},
                      {{ doughById(product.dough).name.toLowerCase() }}
                    </li>
                    <li>
                      Соус: {{ sauceById(product.sauce).name.toLowerCase() }}
                    </li>
                    <li>Начинка: {{ getIngredients(product.ingredients) }}</li>
                  </ul>
                </div>
              </div>

              <div class="counter cart-list__counter">
                <AppItemCounter
                  class="counter cart-list__counter"
                  :number="number"
                  @valueChanged="setNumberOfPizza({ index, number: $event })"
                  button-color="orange"
                />
              </div>

              <div class="cart-list__price">
                <b>{{ $getFormatedPrice(price) }}</b>
              </div>

              <div class="cart-list__button">
                <button
                  type="button"
                  class="cart-list__edit"
                  @click="editProduct(product)"
                >
                  Изменить
                </button>
              </div>
            </li>
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <CartAdditional
                v-for="item in additional"
                :key="item.id"
                :item="item"
              />
            </ul>
          </div>

          <CartDelivery />
        </template>
      </div>
    </main>
    <section v-if="cart.length" class="footer">
      <div class="footer__more">
        <RouterLink
          :to="{ name: 'Home' }"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </RouterLink>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ $getFormatedPrice(cartPrice) }}</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button" @click.prevent="checkout">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import { getFormatedPrice } from "@/common/mixins";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { SET_NUMBER_OF_PRODUCT } from "@/store/mutations-types";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartDelivery from "@/modules/cart/components/CartDelivery";

export default {
  name: "Cart",
  components: {
    CartAdditional,
    CartDelivery,
  },
  mixins: [getFormatedPrice],
  computed: {
    ...mapState("Cart", ["cart", "additional"]),
    ...mapGetters("Cart", ["cartPrice"]),
    ...mapState("Builder", ["pizza"]),
    ...mapGetters("Builder", [
      "ingredientById",
      "doughById",
      "sizeById",
      "sauceById",
    ]),
  },
  methods: {
    ...mapMutations("Cart", { setNumberOfPizza: SET_NUMBER_OF_PRODUCT }),
    ...mapActions("Orders", ["checkout"]),
    getIngredients(ingredients) {
      return ingredients
        .filter(({ number }) => number > 0)
        .map(({ id }) => this.ingredientById(id).name.toLowerCase())
        .join(", ");
    },
    editProduct(product) {
      this.$router.push({ name: "Home", params: { product } });
    },
  },
};
</script>
