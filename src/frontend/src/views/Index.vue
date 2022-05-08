<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  v-for="dough in pizza.dough"
                  :key="`dough-${dough.id}`"
                  class="dough__input"
                >
                  <input
                    type="radio"
                    name="dought"
                    :value="dough.id"
                    class="visually-hidden"
                    :checked="dough.id == 1"
                  />
                  <b>
                    <img class="dough__image" :src="dough.image" alt="" />
                    {{ dough.name }}
                  </b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="size in pizza.sizes"
                  :key="`size-${size.id}`"
                  class="diameter__input diameter__input--small"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="size.id"
                    class="visually-hidden"
                    :checked="size.id == 1"
                  />
                  <span>
                    <img class="diameter__image" :src="size.image" alt="" />
                    {{ size.name }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    v-for="sauce in pizza.sauces"
                    :key="`sauce-${sauce.id}`"
                    class="radio ingredients__input"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="sauce.id"
                      :checked="sauce.id == 1"
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      v-for="ingredient in pizza.ingredients"
                      :key="`ingredient-${ingredient.id}`"
                      class="ingredients__item"
                    >
                      <span class="filling">
                        <img
                          class="filling__image"
                          :src="ingredient.image"
                          alt=""
                        />
                        {{ ingredient.name }}
                      </span>

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

export default {
  data() {
    return {
      user,
      pizza,
      misc,
    };
  },
};
</script>

<style lang="scss">
.dough__image {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 36px;
  height: 36px;
  transition: 0.3s;
  border-radius: 50%;
}
.diameter__image {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 36px;
  height: 36px;
  transition: 0.3s;
  border-radius: 50%;
  background-color: #e1ffd7;
}
.filling__image {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ffffff;
}
</style>
