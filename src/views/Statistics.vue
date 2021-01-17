<template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <template v-slot:header>
      <top-bar>
        <radio-group v-model="dateType">
          <radio-button label="year">年</radio-button>
          <radio-button label="year-month">月</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <div class="date" @click="showDatePicker = true">
      {{ dateStr }}&#9660;
    </div>
    <v-echarts class="charts" height="200px" :option="option" :listeners="echartsListeners"/>
    <div v-if="categoryRankData.length === 0" class="backup-message">暂无数据</div>
    <ol v-else class="category-rank-list">
      <li class="rank-list-item" v-for="item in categoryRankData" :key="item.category.id">
        <div class="icon-wrapper">
          <icon class="icon" size="24" :name="item.category.icon"/>
        </div>
        <div class="info">
          <span class="text-info">
            <span class="icon-name">{{ item.category.name }}</span>
            <span class="percent">{{ item.percent.toFixed(2) }}%</span>
            <span class="amount">{{ item.sum }}</span>
          </span>
          <div class="percent-bar" :style="{width: item.percent + '%'}"></div>
        </div>
      </li>
    </ol>
    <pop-up v-model="showDatePicker" position="bottom">
      <DatePicker :type="dateType" v-model="curDate" @ok="showDatePicker = !showDatePicker"/>
    </pop-up>
  </layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";
import DatePicker from "@/components/DatePicker/DatePicker.vue";
import PopUp from "@/components/PopUp.vue";
import TopBar from "@/components/TopBar.vue";
import RadioButton from "@/components/Radio/RadioButton.vue";
import RadioGroup from "@/components/Radio/RadioGroup.vue";
import Icon from "@/components/Icon/Icon.vue";
import VEcharts from "@/components/VEcharts.vue";
import dayjs from "dayjs";
import {State} from "vuex-class";
import {EChartOption} from "echarts";
import {getCategoryById, getRecords, getRecordsByTime} from "@/store/utils";

type CategoryToRecordsMap = { [categoryId: number]: MoneyRecord[] }
type CategoryToSumMap = { [categoryId: number]: number }

const monthArr = Array(12).fill(0).map((_, index) => index + 1)

@Component({
  components: {
    Layout,
    NavBar,
    DatePicker,
    PopUp,
    TopBar,
    RadioButton,
    RadioGroup,
    VEcharts,
    Icon,
  }
})
export default class Statistics extends Vue {
  @State(state => state.record.recordList) readonly recordList!: MoneyRecord[]
  @State(state => state.category.categoryList) readonly categoryList!: Category[]
  dateType = 'year-month'
  curDate = new Date()
  showDatePicker = false
  moneyType: MoneyType = 'expenditure'
  echartsListeners = {
    'legendselectchanged': (e: { type: string; name: string; select: object }) => {
      this.handleLegendChanged(e.name)
    }
  }

  get dateStr() {
    if (this.dateType === 'year') {
      return dayjs(this.curDate).format('YYYY年')
    } else {
      return dayjs(this.curDate).format('YYYY年M月')
    }
  }

  get dateArr() {
    return Array(dayjs(this.curDate).daysInMonth()).fill(0).map((_, index) => index + 1)
  }

  get categoryRankData() {
    let records = this.recordList
    records = this.dateType === 'year-month' ?
        getRecordsByTime(records, this.curDate, 'month') : getRecordsByTime(records, this.curDate, 'year')
    records = getRecords(records, {
      moneyType: this.moneyType
    })
    const sumsForCategories = this.getSumsForCategories(records)
    const ret = Object.entries(sumsForCategories)
    const total = ret.reduce((acc, item) => acc + item[1], 0)
    ret.sort((a, b) => b[1] - a[1])
    return ret.map(item => {
      return {
        category: getCategoryById(this.categoryList, parseInt(item[0])),
        sum: item[1],
        percent: item[1] / total * 100
      }
    })
  }

  handleLegendChanged(name: string) {
    if (name === '收入') {
      this.moneyType = 'income'
    }
    if (name === '支出') {
      this.moneyType = 'expenditure'
    }
  }

  get option(): EChartOption {
    const xSeriesData = this.dateType === 'year-month' ? this.dateArr : monthArr
    const ySeriesData = this.dateType === 'year-month' ?
        this.getSumByDates(this.recordList, this.curDate) : this.getSumForMonths(this.recordList, this.curDate)

    return {
      tooltip: {
        show: true,
        trigger: 'axis',
        transitionDuration: 0,
        formatter: `{b}${this.dateType === 'year' ? '月' : '日'}<br/>{a} : {c}元`,
        textStyle: {
          fontSize: 12,
        },
        confine: true,
        position: function (point) {
          return [point[0], '30%']
        }
      },
      grid: {
        top: 40,
        bottom: 20,
        left: 10,
        right: 10
      },
      color: ['#ff9800'],
      title: {
        text: `${this.dateType === 'year' ? '年' : '月'}度趋势图`,
        top: 10,
        left: 6,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      legend: {
        selectedMode: 'single',
        top: 10,
        icon: 'roundRect',
        textStyle: {
          fontSize: 16,
        }
      },
      xAxis: {
        type: 'category',
        data: xSeriesData,
        axisTick: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        name: '支出',
        seriesLayoutBy: 'row',
        type: 'line',
        symbol: 'emptycircle',
        symbolSize: 6,
        lineStyle: {
          color: '#bbb',
          width: 1,
        },
        data: ySeriesData['expenditure']
      }, {
        name: '收入',
        seriesLayoutBy: 'row',
        type: 'line',
        symbol: 'emptycircle',
        symbolSize: 6,
        lineStyle: {
          color: '#bbb',
          width: 1,
        },
        data: ySeriesData['income']
      }]
    }
  }

  getSumByDates(records: MoneyRecord[], date: Date) {
    records = getRecordsByTime(records, date, 'month')
    const ret = {
      income: this.dateArr.map(_ => 0),
      expenditure: this.dateArr.map(_ => 0)
    }
    return records.reduce((acc, record) => {
      acc[record.moneyType][dayjs(record.createAt).date() - 1] += record.amount
      return acc
    }, ret)
  }

  getSumForMonths(records: MoneyRecord[], date: Date) {
    records = getRecordsByTime(records, date, 'year')
    const ret: {
      income: number[];
      expenditure: number[];
    } = {
      income: monthArr.map(_ => 0),
      expenditure: monthArr.map(_ => 0)
    }
    return records.reduce((acc, record) => {
      acc[record.moneyType][dayjs(record.createAt).month()] += record.amount
      return acc
    }, ret)
  }

  getSumsForCategories(records: MoneyRecord[]): CategoryToSumMap {
    function getCategoryToRecordMap(records: MoneyRecord[]) {
      const map: CategoryToRecordsMap = {}
      return records.reduce((acc, record) => {
        if (acc[record.categoryId]) {
          acc[record.categoryId].push(record)
        } else {
          acc[record.categoryId] = [record]
        }
        return acc
      }, map)
    }

    const map = getCategoryToRecordMap(records)
    const ret: { [categoryId: number]: number } = {}
    for (const i in map) {
      if (!Object.prototype.hasOwnProperty.call(map, i)) continue
      ret[i] = map[i].reduce((acc, record) => acc + record.amount, 0)
    }
    return ret
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.charts {
  flex-shrink: 0;
}

.date {
  text-align: center;
  color: $brand-color;
  background-color: $grey-1;
  line-height: 30px;
}

.category-rank-list {
  padding: 10px;

  .rank-list-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid $grey-2;

    .icon-wrapper {
      width: 40px;
      height: 40px;
      background-color: $grey-1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      margin-right: 10px;

      .icon {
        fill: $brand-color;
      }
    }

    .info {
      flex: 1;

      .text-info {
        display: flex;
        align-items: center;

        .percent {
          font-size: 12px;
          margin-left: 6px;
        }

        .amount {
          margin-left: auto;
        }
      }

      .percent-bar {
        margin: 4px 0;
        height: 6px;
        width: 100%;
        border-radius: 5px;
        background-color: $brand-color;
      }
    }
  }
}

.backup-message {
  color: $grey-5;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}
</style>
