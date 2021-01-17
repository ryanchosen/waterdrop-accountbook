<template>
  <div class="number-pad" @click="onClick">
    <button class="calc-button" data-type="1">1</button>
    <button class="calc-button" data-type="2">2</button>
    <button class="calc-button" data-type="3">3</button>
    <button @click="showDatePicker = true" class="date-picker-button" data-type="date">{{ dateStr }}</button>
    <button class="calc-button" data-type="4">4</button>
    <button class="calc-button" data-type="5">5</button>
    <button class="calc-button" data-type="6">6</button>
    <button class="calc-button" data-type="+">+</button>
    <button class="calc-button" data-type="7">7</button>
    <button class="calc-button" data-type="8">8</button>
    <button class="calc-button" data-type="9">9</button>
    <button class="calc-button" data-type="-">-</button>
    <button class="calc-button" data-type=".">.</button>
    <button class="calc-button" data-type="0">0</button>
    <button class="clear-button" data-type="clear"><icon name="backspace" size="24"/></button>
    <button v-if="!showEqual" class="submit-button" data-type="submit">完成</button>
    <button v-if="showEqual" class="equal-button" data-type="getResult">=</button>
    <pop-up v-model="showDatePicker" position="bottom">
      <DatePicker v-model="curDate" @ok="showDatePicker = false"/>
    </pop-up>
  </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import PopUp from "@/components/PopUp.vue";
import DatePicker from "@/components/DatePicker/DatePicker.vue";
import Icon from "@/components/Icon/Icon.vue";
import dayjs from "dayjs";

type Operator = '+' | '-'
type NumberStr = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type NumberPadHandlerVal = Operator | NumberStr | 'submit' | 'date' | 'clear' | '.' | 'getResult'

@Component({
  components: {
    PopUp,
    DatePicker,
    Icon
  }
})
export default class NumberPad extends Vue {
  @Model('input:date', {type: Date}) readonly date!: Date
  @Prop(Boolean) readonly showEqual!: boolean
  curDate = this.date || new Date()
  showDatePicker = false

  get dateStr() {
    return dayjs(this.curDate).format('YYYY/MM/DD')
  }

  @Watch('curDate')
  onDateChange(newVal: Date) {
    this.$emit('input:date', newVal)
  }

  onClick(e: MouseEvent) {
    const container = e.currentTarget as HTMLDivElement
    let target = e.target as HTMLElement
    while (container.contains(target) && !target.dataset.type) {
      target = target.parentNode as HTMLElement
    }
    const btnType = target.dataset.type
    if (container === target) return
    switch (btnType) {
      case '+':
      case '-':
        this.$emit('input:operator', btnType)
        break
      case 'submit':
        this.$emit('input:submit')
        break
      case 'clear':
        this.$emit('input:clear')
        break
      case '.':
        this.$emit('input:dot')
        break
      case 'getResult':
        this.$emit('input:getResult')
        break
      case 'date':
        break
      default:
        this.$emit('input:number', btnType)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

$gap: 10px;
.number-pad {
  background: $grey-2;
  display: flex;
  flex-wrap: wrap;
  padding: $gap / 2;

  > button {
    box-sizing: content-box;
    display: inline-block;
    width: calc((100% - #{$gap * 5}) / 4);
    margin: $gap / 2;
    font-size: 16px;
    line-height: 2;
    background: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    transition: all 100ms ease-in;

    &:focus {
      outline: none;
    }

    &:active {
      color: #fff;
      background-color: $brand-color;
    }
    &.clear-button {
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        stroke-width: 0.5
      }
    }
    &.submit-button,
    &.equal-button {
      color: #fff;
      background-color: $brand-color;

      &:active {
        color: #000;
        background: #fff;
      }
    }

    &.date-picker-button {
      font-size: 14px;
    }
  }
}
</style>
