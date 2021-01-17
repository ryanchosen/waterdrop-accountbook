<template>
  <svg
    viewBox="0 0 1024 1024"
    class="icon"
    :style="{width: size+'px', height: size + 'px'}"
  >
    <use :xlink:href="'#'+name" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r);
}
importAll(require.context("../../assets/icon", true, /\.svg$/));

@Component
export default class Icon extends Vue {
  @Prop({required: true, type: String}) readonly name!: string;
  @Prop([Number, String]) readonly size!: number | string;
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
