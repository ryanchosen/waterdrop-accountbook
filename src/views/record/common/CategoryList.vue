<template>
  <ul class="category-list">
    <li
      :class="listItemClassName(category)"
      v-for="category in listData"
      :key="category.id"
      @click="handleClick(category.id)"
    >
      <div class="category-icon-wrapper">
        <Icon :size="30" class="category-icon" :name="category.icon" />
      </div>
      {{category.name}}
    </li>
    <li
        v-if="type === 'manage'"
        key="setting"
        @click="handleManage"
        class="category-list-item"
    >
      <div class="category-icon-wrapper">
        <Icon :size="30" class="category-icon" name="settings" />
      </div>
      管理
    </li>
    <li
        v-if="type === 'add'"
        key="add"
        @click="handleAdd"
        class="category-list-item"
    >
      <div class="category-icon-wrapper">
        <Icon :size="30" class="category-icon" name="tianjia" />
      </div>
      添加
    </li>
  </ul>
</template>

<script lang="ts">
import {Vue, Component, Model, Prop} from "vue-property-decorator";
import Icon from '@/components/Icon/Icon.vue';


@Component({
  components: {
    Icon,
  }
})
export default class CategoryList extends Vue {
  @Model('change', { type: Number }) readonly selectedCategoryId!: number;
  @Prop(Array) readonly listData!: Category[];
  @Prop({type: String}) readonly type?: 'manage' | 'add'

  listItemClassName(category: Category) {
    return  {
      'category-list-item': true,
      'is-active': this.selectedCategoryId === category.id
    }
  }
  handleClick(id: number) {
    this.$emit('change', id)
  }
  handleManage() {
    this.$emit('manage')
  }
  handleAdd() {
    this.$emit('add')
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';
$gap: 20px;
.category-list {
  display: flex;
  flex-wrap: wrap;
  padding: $gap / 2;
  align-items: flex-start;
  .category-list-item {
    width: 20%;
    margin: $gap / 2 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .category-icon-wrapper {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: $grey-2;
      margin-bottom: 6px;
    }
    &.is-active .category-icon-wrapper {
      background-color: $brand-color;
      .category-icon {
        fill: $grey-2;
      }
    }
  }
}
</style>
