<template>
  <overlay
    animation="fade"
    :duration="duration"
    :show="show"
    @click="$emit('change', false)"
  >
    <transition :name="animateName" :duration="duration" appear>
      <div
        :style="{height: height}"
        :class="popupClass"
        v-show="show"
        @click.stop
      >
        <slot/>
      </div>
    </transition>
  </overlay>
</template>

<script lang="ts">
import {Component, Vue, Prop, Model} from 'vue-property-decorator'
import Overlay from './Overlay.vue'

type PopupPosition = 'top' | 'left' | 'right' | 'bottom' | 'center'

@Component({
  components: {
    Overlay
  }
})
export default class PopUp extends Vue {
  @Model('change', { type: Boolean, required: true }) readonly show!: boolean
  @Prop({default: 'center'}) readonly position!: PopupPosition
  @Prop({default: 300}) readonly duration!: number
  @Prop(String) readonly height?: string
  get popupClass() {
    return {
      'popup': true,
      [this.position]: this.position
    }
  }
  get animateName() {
    if (this.position !== 'center') {
      return `slide-from-${this.position}`
    } else {
      return 'fade'
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  background-color: #fff;
}
.top {
  top: 0;
  left: 0;
  width: 100%;
}
.left {
  top: 0;
  left: 0;
  height: 100%;
}
.right {
  top: 0;
  right: 0;
  height: 100%;
}
.bottom {
  width: 100%;
  bottom: 0;
  left: 0;
}
.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
</style>
