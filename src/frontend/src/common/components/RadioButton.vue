<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      v-on="$listeners"
    />
    <span>{{ title }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
