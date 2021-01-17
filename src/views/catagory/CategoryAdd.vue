<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <template v-slot:right>
          <button class="finished-btn" @click="handleFinished">完成</button>
        </template>
        添加{{ chineseMoneyType }}分类
      </top-bar>
    </template>
    <category-info :icon="categoryIcon" v-model="categoryName"/>
    <icon-list v-model="categoryIcon"/>
  </layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Layout from "@/components/Layout.vue";
import TopBar from "@/components/TopBar.vue";
import Icon from "@/components/Icon/Icon.vue";
import IconList from "@/views/catagory/IconList.vue";
import CategoryInfo from "@/views/catagory/CategoryInfo.vue";
import {CATEGORY_ICON_NAMES} from "@/assets/icon";
import {Action, State} from "vuex-class";

@Component({
  components: {
    CategoryInfo,
    IconList,
    Layout,
    TopBar,
    Icon,
  }
})
export default class CategoryAdd extends Vue {
  @State(state => state.category.categoryList) readonly categoryList!: Category[]
  @Action('category/add') readonly categoryAdd!: (payload: Omit<Category, "id">) => void
  iconList = CATEGORY_ICON_NAMES
  categoryName = ''
  categoryIcon = CATEGORY_ICON_NAMES[0]

  handleFinished() {
    if (!this.validate()) return
    this.categoryAdd({
      icon: this.categoryIcon,
      moneyType: this.$route.params.type as MoneyType,
      name: this.categoryName
    })
    this.$message({type: 'success', message: '添加分类成功'})
    this.$router.back()
  }

  get chineseMoneyType() {
    const map = {
      'expenditure': '支出',
      'income': '收入'
    }
    return map[this.$route.params.type as MoneyType]
  }

  validate() {
    if (this.categoryName.length === 0) {
      this.$message({type: 'warning', message: '分类名称不能为空'})
      return false
    }
    if (this.categoryName.length > 6) {
      this.$message({type: 'warning', message: '分类名称不能长于6个字'})
      return false
    }
    if (this.categoryIcon === '') {
      this.$message({type: 'warning', message: '请选择分类图标'})
      return false
    }
    if (this.categoryList.some(category => category.name === this.categoryName)) {
      this.$message({type: 'warning', message: '不能与已有分类名称重复'})
      return false
    }
    return true
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.finished-btn {
  color: $brand-color;
}
</style>
