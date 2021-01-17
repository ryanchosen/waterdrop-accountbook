<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <template v-slot:right>
          <button class="finished-btn" @click="handleFinished">完成</button>
        </template>
        编辑分类
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
import {Action, Getter, State} from "vuex-class";

@Component({
  components: {
    CategoryInfo,
    IconList,
    Layout,
    TopBar,
    Icon,
  }
})
export default class CategoryEdit extends Vue {
  @State(state => state.category.categoryList) readonly categoryList!: Category[]
  @Action('category/edit') readonly categoryEdit!: (payload: Pick<Category, "id"> & Partial<Omit<Category, "id">>) => void
  @Getter('category/getCategoryById') readonly getCategoryById!: (id: number) => Category
  categoryName = ''
  categoryIcon = ''
  created() {
    const category = this.getCategoryById(Number(this.$route.params.id))
    if (!category) {
      this.$router.push('/')
    }
    this.categoryName = category.name
    this.categoryIcon = category.icon
  }
  handleFinished() {
    if (!this.validate()) return
    this.categoryEdit({
      id: Number(this.$route.params.id),
      icon: this.categoryIcon,
      name: this.categoryName
    })
    this.$message({type: 'success', message: '编辑分类成功'})
    this.$router.back()
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
