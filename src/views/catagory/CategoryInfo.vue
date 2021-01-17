<template>
  <div class="category-info">
    <span class="category-icon-wrapper">
      <icon class="category-icon" :name="icon"/>
    </span>
    <input type="text" class="icon-name" :value="name" @input="$emit('change', $event.target.value)" placeholder="分类名称">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Model} from "vue-property-decorator";
import Icon from "@/components/Icon/Icon.vue";
@Component({
  components: {Icon}
})
export default class CategoryInfo extends Vue {
  @Model('change', {required: true, type: String}) readonly name!: string
  @Prop({required: true, type: String}) readonly icon!: string
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: $brand-color;
  .category-icon {
    fill: #fff;
    width: 30px;
    height: 30px;
  }
}
.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  .icon-name {
    width: 0;
    flex: 1;
    border: none;
    outline: none;
    text-align: right;
    line-height: 24px;
    font-size: 20px;
  }
}
</style>