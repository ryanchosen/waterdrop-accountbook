<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <radio-group v-model="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
        <template v-slot:right>
          <button class="delete-btn" @click="handleDelete">删除</button>
        </template>
      </top-bar>
    </template>
    <div class="category-list-wrapper">
      <category-list type="manage" v-model="selectedId" :listData="selectedCategoryList" @manage="onManageClick"/>
    </div>
    <div class="control-panel">
      <calc-str-bar :calcStr="calcStr"/>
      <calc-pad :date.sync="curDate" :calc.sync="calcStr" @submit="handleSubmit"/>
    </div>
  </layout>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";
import Icon from "@/components/Icon/Icon.vue";
import TopBar from "@/components/TopBar.vue";
import RadioButton from "@/components/Radio/RadioButton.vue";
import RadioGroup from "@/components/Radio/RadioGroup.vue";
import CategoryList from "./common/CategoryList.vue";
import NumberPad from "./common/NumberPad.vue";
import CalcStrBar from "./common/CalcStrBar.vue";
import CalcPad from "@/views/record/common/withCalc";

import {Action, Getter, State,} from 'vuex-class'

@Component({
  components: {
    Layout,
    NavBar,
    Icon,
    TopBar,
    RadioButton,
    RadioGroup,
    CategoryList,
    NumberPad,
    CalcStrBar,
    CalcPad,
  },
})
export default class RecordAdd extends Vue {
  @State(state => state.category.categoryList) categoryList!: Category[]
  @State(state => state.record.recordList) recordList!: MoneyRecord[]
  @Action('record/edit') editRecord!: (payload: Pick<MoneyRecord, "id"> & Partial<Omit<MoneyRecord, "id">>) => void
  @Action('record/delete') deleteRecord!: (id: number) => void
  @Getter('record/getRecords') readonly getRecords!: (option: Partial<IndexedMoneyRecord>) => MoneyRecord[]

  moneyType: MoneyType = 'expenditure'
  selectedId = -1
  curDate: Date = new Date
  calcStr = ''

  created() {
    const record = this.getRecords({id: Number(this.$route.params.id)})[0]
    if (!record) {
      this.$router.push('/')
      return
    }
    this.selectedId = record.categoryId
    this.moneyType = record.moneyType
    this.curDate = new Date(record.createAt)
    this.calcStr = '' + record.amount
  }

  get selectedCategoryList() {
    return this.categoryList.filter(item => item.moneyType === this.moneyType)
  }

  onManageClick() {
    this.$router.push('/category/manage')
  }

  handleDelete() {
    this.deleteRecord(parseInt(this.$route.params.id))
    this.$message({type: 'success', message: '删除成功'})
    this.$router.back()
  }

  validate() {
    if (this.selectedId === -1) {
      this.$message({type: 'warning', message: '分类不能为空'})
      return false
    } else if (this.calcStr === '0') {
      this.$message({type: 'warning', message: '数值不能为0'})
      return false
    } else if (parseFloat(this.calcStr) < 0) {
      this.$message({type: 'warning', message: '数值不能为负'})
      return false
    }
    return true
  }

  handleSubmit() {
    if (!this.validate()) {
      return
    }
    this.editRecord({
      id: parseInt(this.$route.params.id),
      moneyType: this.moneyType,
      categoryId: this.selectedId,
      amount: +this.calcStr,
      createAt: this.curDate.toISOString()
    })
    this.$message({type: 'success', message: '编辑成功', duration: 1000})
    this.$router.push('/record/detail')
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.category-list-wrapper {
  flex: 1;
  overflow: auto;
}

.control-panel {
  flex-shrink: 0;
}

.delete-btn {
  color: $danger;
}
</style>
