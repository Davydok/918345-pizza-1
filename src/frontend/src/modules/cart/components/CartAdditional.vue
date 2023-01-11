<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <AppItemCounter
          class="counter additional-list__counter"
          :number="additionalById(item.id).number"
          @valueChanged="setAdditionalNumber({ id: item.id, number: $event })"
          button-color="orange"
        />
      </div>

      <div class="additional-list__price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { SET_ADDITIONAL_NUMBER } from "@/store/mutations-types";

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters("Cart", ["additionalById"]),
  },
  methods: {
    ...mapMutations("Cart", { setAdditionalNumber: SET_ADDITIONAL_NUMBER }),
  },
};
</script>
