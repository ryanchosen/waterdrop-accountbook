<template>
  <ul class="category-icon-list">
    <li v-for="name in iconList" :key="name" @click="$emit('change', name)">
        <span :class="getIconWrapperClass(name)">
          <icon class="category-icon" :name="name"/>
        </span>
    </li>
  </ul>
</template>

<script lang="ts">
import {Vue, Component, Model} from "vue-property-decorator";
import {CATEGORY_ICON_NAMES} from "@/assets/icon";
import Icon from "@/components/Icon/Icon.vue";

@Component({
  components: {Icon}
})
export default class IconList extends Vue {
  @Model('change', {required: true, type: String}) readonly icon!: string
  iconList = CATEGORY_ICON_NAMES
  getIconWrapperClass(iconName: string) {
    return {
      'category-icon-wrapper': true,
      'is-active': this.icon === iconName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.category-icon-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .category-icon-wrapper {
    margin: 10px 10px;
  }
  > li {
    width: 20%;
  }
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: $grey-2;
  &.is-active {
    background-color: $brand-color;
    .category-icon {
      fill: #fff;
    }
  }
  .category-icon {
    width: 30px;
    height: 30px;
  }
}
</style>