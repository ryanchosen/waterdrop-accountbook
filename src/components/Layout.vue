<template>
  <div class="layout">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Layout extends Vue {

}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  header,
  footer {
    flex: 0 0 0;
  }
  main {
    flex: 1;
    overflow: auto;
    /* 处理子元素的溢出问题 */
    /* https://medium.com/@stephenbunch/how-to-make-a-scrollable-container-with-dynamic-height-using-flexbox-5914a26ae336  */
    display: flex;
    flex-direction: column;
  }
}
</style>
