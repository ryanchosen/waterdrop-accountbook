<template>
  <div class="radio-input">
    <slot />
  </div>
</template>

<script lang="tsx">
import { Vue, Component, Model } from "vue-property-decorator";

@Component
export default class RadioGroup extends Vue {
  @Model('change', {type: String}) readonly value!: string
}
</script>

<style lang="scss" scoped>
.radio-input {
  :nth-child(n+2) {
    margin-left: -1px;
  }
}
</style>
