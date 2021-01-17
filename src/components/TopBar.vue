<template>
  <div class="top-bar">
    <span class="left">
      <slot name="left">
        <button v-if="showBack" class="back-btn" @click="handleBack">
          <icon class="back-icon" name="back" />
          返回
        </button>
      </slot>
    </span>
    <span class="center"><slot></slot></span>
    <span class="right"><slot name="right"></slot></span>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import Icon from "@/components/Icon/Icon.vue";

@Component({
  components: {
    Icon,
  }
})
export default class TopBar extends Vue {
  @Prop({default: false, type: Boolean}) readonly showBack!: boolean

  handleBack() {
    this.$router && this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable.scss';
$x-space: 20px;
$y-space: 8px;
.top-bar {
  display: flex;
  position: relative;
  padding: $y-space 0px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px #e0e0e0;
  line-height: 28px;
  flex-shrink: 0;
  .left, .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .left {
    left: $x-space;
  }
  .right {
    right: $x-space;
  }
}
.back-btn {
  color: $grey-5;
  .back-icon {
    fill: $grey-5;
  }
}
</style>
