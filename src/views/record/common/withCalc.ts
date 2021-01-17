import {CreateElement} from "vue";
import {Vue, Component, Watch, Prop} from 'vue-property-decorator';
import NumberPad from "@/views/record/common/NumberPad.vue";

type Operator = '+' | '-'
type NumberStr = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type NumberPadHandlerVal = Operator | NumberStr | 'submit' | 'date' | 'clear' | '.' | 'getResult'
function withCalc(Comp?: any) {
  @Component({
    components: {
      NumberPad
    }
  })
  class Wrapper extends Vue {
    @Prop(Date) readonly date!: Date
    @Prop(String) readonly calc!: string
    left = this.calc || '0'
    right = ''
    operator = ''
    @Watch('calcStr')
    onCalcStrChange(newVal: string) {
      this.$emit('update:calc', newVal)
    }
    @Watch('curDate')
    onDateChange(newVal: Date) {
      this.$emit('update:date', newVal)
    }
    get calcStr() {
      return this.left + this.operator + this.right
    }
    getCalcResult() {
      let result = 0
      if (this.operator === '+') {
        result = +this.left + +this.right
      } else {
        result = +this.left - +this.right
      }
      // 如果为.00，则说明为整数，可以去除
      this.left = result.toFixed(2).replace(/\.00$/, '')
      this.right = ''
      this.operator = ''
    }
    handleOperator(val: Operator) {
      if (this.right.length !== 0) {
        this.getCalcResult()
      }
      this.operator = val
    }
    handleNumber(val: NumberStr) {
      const reg = /\.\d{2,}$/
      if (this.operator) {
        if (reg.test(this.right)) return
        if (this.right === '0') {
          this.right = val
        } else {
          this.right += val
        }
      } else {
        if (reg.test(this.left)) return
        if (this.left === '0') {
          this.left = val
        } else {
          this.left += val
        }
      }
    }
    handleDot() {
      if (this.operator) {
        if (this.right.indexOf('.') === -1) {
          if (this.right.length === 0) this.right = '0'
          this.right += '.'
        }
      } else {
        if (this.left.indexOf('.') === -1) {
          if (this.left.length === 0) this.right = '0'
          this.left += '.'
        }
      }
    }
    handleClear() {
      if (this.right) {
        this.right = this.right.slice(0, -1)
      } else if (this.operator) {
        this.operator = ''
      } else if (this.left.length > 1) {
        this.left = this.left.slice(0, -1)
      } else {
        this.left = '0'
      }
    }
    handleSubmit() {
      this.getCalcResult()
      if (typeof this.$listeners.submit === 'function') {
        this.$listeners.submit()
      }
    }
    handleDate(d: Date) {
      this.$emit('update:date', d)
    }
    render(h: CreateElement) {
      return h(Comp, {
        props: {
          showEqual: this.operator.length !== 0,
          date: this.date
        },
        on: {
          'input:number': this.handleNumber,
          'input:operator': this.handleOperator,
          'input:dot': this.handleDot,
          'input:submit': this.handleSubmit,
          'input:getResult': this.getCalcResult,
          'input:clear': this.handleClear,
          'input:date': this.handleDate,
        }
      })
    }
  }
  return Wrapper
}

const CalcPad = withCalc(NumberPad)
export default CalcPad
