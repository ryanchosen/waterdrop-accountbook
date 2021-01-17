<template>
  <div class="calc-str-bar">
    <span>{{calcStr}}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CalcStrBar extends Vue {
  @Prop(String) calcStr!: string
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';
$gap: 10px;

.calc-str-bar {
  padding: $gap;
  background-color: $grey-2;
  span {
    display: block;
    font-size: 20px;
    padding-right: $gap;
    line-height: 30px;
    border: 1px solid #fff;
    border-radius: 4px;
    background-color: #fff;
    text-align: right;
  }
}
</style>
