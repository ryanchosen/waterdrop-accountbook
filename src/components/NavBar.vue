<template>
  <nav class="nav-bar">
    <router-link class="nav-bar-item" to="/record/detail">
      <Icon class="nav-bar-icon" name="detail"/>
      明细
    </router-link>
    <router-link class="nav-bar-item" to="/record/add">
      <Icon class="nav-bar-icon" name="money"/>
      记一笔
    </router-link>
    <router-link class="nav-bar-item" to="/statistics">
      <Icon class="nav-bar-icon" name="statistics"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Icon.vue";

@Component({
  components: {
    Icon
  }
})
export default class NavBar extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/style/variable";
.nav-bar {
  display: flex;
  box-shadow: 0 -2px 8px #e0e0e0;
  > .nav-bar-item {
    flex: 1 0 0;
    line-height: 1;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-bar-icon {
      font-size: 20px;
      margin-bottom: 8px;
    }
    &.router-link-exact-active {
      color: $brand-color;
      .nav-bar-icon {
        fill: $brand-color;
      }
    }
  }
}
</style>
