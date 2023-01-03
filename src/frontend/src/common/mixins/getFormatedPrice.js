export default {
  methods: {
    $getFormatedPrice(price) {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        trailingZeroDisplay: "stripIfInteger",
      }).format(price);
    },
  },
};
