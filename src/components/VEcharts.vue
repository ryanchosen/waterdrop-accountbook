<template>
  <div ref="charts" :style="{width: width, height: height}">echarts</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import echarts, {EChartOption, ECharts} from 'echarts';

type EchartsListeners = {
  [index: string]: Function | Function[];
}

@Component
export default class VEcharts extends Vue {
  @Prop(Object) readonly option!: EChartOption
  @Prop({default: "100%", type: String}) readonly width!: string
  @Prop({default: "300px", type: String}) readonly height!: string
  @Prop(Object) readonly listeners!: EchartsListeners


  charts: ECharts | null = null

  mounted() {
    const container = this.$refs.charts as HTMLDivElement
    this.charts = echarts.init(container)
    this.charts.setOption(this.option)
    this.bindListeners(this.listeners)
  }

  @Watch('option')
  onOptionUpdate() {
    this.charts?.setOption(this.option)
  }

  unbindListeners(listeners: EchartsListeners) {
    if(listeners) {
      for (const i in listeners) {
        this.charts?.off(i)
      }
    }
  }
  bindListeners(listeners: EchartsListeners) {
    for (const j in listeners) {
      const handler = listeners[j]
      if (Array.isArray(handler)) {
        handler.forEach(fn => {
          this.charts?.on(j, fn)
        })
      } else if (typeof handler === 'function') {
        this.charts?.on(j, handler)
      }
    }
  }
  @Watch('listeners', {immediate: true})
  onListenersUpdate(newVal: EchartsListeners, oldVal: EchartsListeners) {
    if (!this.charts) return
    this.unbindListeners(oldVal)
    this.bindListeners(newVal)
  }
}
</script>

<style lang="scss" scoped>

</style>