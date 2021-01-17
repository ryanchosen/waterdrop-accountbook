<template>
  <transition
    :name="animation"
    appear
    :duration="duration"
  >
    <div @click="onClick" class="overlay" v-show="show">
      <slot/>
    </div>
  </transition>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

@Component
export default class Overlay extends Vue {
  @Prop({default: false, type: Boolean}) readonly show!: boolean
  @Prop({default: 0, type: Number}) readonly duration!: number
  @Prop({default: 'body', type: String}) readonly container!: string
  @Prop(String) readonly animation!: string

  onClick(e: Event) {
    this.$emit('click', e)
  }
  mounted() {
    this.portal(this.container)
  }
  beforeDestroy() {
    this.$el.remove()
  }
  @Watch('container')
  onContainerChange(val: string) {
    this.portal(val)
  }
  portal(containerSelector: string) {
    const container = document.querySelector(containerSelector)
    container?.appendChild(this.$el)
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  transform: translateZ(0);
}
</style>
