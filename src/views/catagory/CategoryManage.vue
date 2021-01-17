<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <radio-group v-model="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <category-list type="add" :listData="selectedCategoryList" @change="onChange" @add="onAddClick"/>
  </layout>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import TopBar from "@/components/TopBar.vue";
import Icon from "@/components/Icon/Icon.vue";
import RadioGroup from "@/components/Radio/RadioGroup.vue";
import RadioButton from "@/components/Radio/RadioButton.vue";
import CategoryList from "@/views/record/common/CategoryList.vue";
import {Getter, State} from "vuex-class";

@Component({
  components: {
    Layout,
    TopBar,
    Icon,
    RadioGroup,
    RadioButton,
    CategoryList,
  }
})
export default class CategoryManage extends Vue {
  @State(state => state.category.categoryList) categoryList!: Category[]
  @Getter('category/getCategories') readonly getCategories!: (option: Partial<IndexedCategory>) => Category[]

  moneyType: MoneyType = 'expenditure'
  onChange(id: number) {
    this.$router.push(`/category/edit/${id}`)
  }
  onAddClick() {
    this.$router.push(`/category/add/${this.moneyType}`)
  }
  get selectedCategoryList() {
    return this.getCategories({
      moneyType: this.moneyType
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.back-btn {
  color: $grey-5;
  .back-icon {
    fill: $grey-5;
  }
}
</style>
