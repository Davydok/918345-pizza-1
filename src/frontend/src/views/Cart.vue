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
                v-for="item in misc"
                :key="item.id"
                :item="item"
              />
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="test" class="select">
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option value="3">Дом</option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input type="text" name="tel" placeholder="+7 999-999-99-99" />
              </label>

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input type="text" name="street" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input type="text" name="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input type="text" name="apartment" />
                  </label>
                </div>
              </div>
            </div>
          </div>
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
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { getFormatedPrice } from "@/common/mixins";
import { mapState, mapGetters, mapMutations } from "vuex";
import { SET_NUMBER_OF_PRODUCT } from "@/store/mutations-types";
import CartAdditional from "@/modules/cart/components/CartAdditional";

export default {
  name: "Cart",
  components: {
    CartAdditional,
  },
  mixins: [getFormatedPrice],
  computed: {
    ...mapState("Cart", ["cart", "misc", "additional"]),
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
