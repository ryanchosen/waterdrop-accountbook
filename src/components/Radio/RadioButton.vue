<template>
  <label :class="radioButtonClassName">
    <input
      class="radio-button-input"
      type="radio"
      :value="label"
      v-model="value"
    >
    <span class="radio-button-text">
      <slot>{{label}}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import RadioGroup from './RadioGroup.vue';

@Component
export default class RadioButton extends Vue {
  @Prop(String) label!: string

  get _radioGroup() {
    // TODO
    return this.$parent as RadioGroup
  }
  get radioButtonClassName() {
    return {
      'radio-button': true,
      'is-active': this.label === this.value
    }
  }

  get value() {
    return this._radioGroup.value
  }

  set value(val) {
    this._radioGroup.$emit('change', this.label)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable.scss';
.radio-button {
  display: inline-block;
  padding: 5px 15px;
  line-height: 16px;
  border: 1px solid $brand-color;
  color: $brand-color;
  .radio-button-input {
    display: none;
  }
  .radio-button-text {
    font-size: 14px;
  }
  &.is-active {
    color: #fff;
    background: $brand-color;
  }
}

</style>
