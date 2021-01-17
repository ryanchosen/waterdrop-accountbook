<template>
  <div id="app">
    <transition class="router-transition-wrapper" :name="transitionName">
      <router-view class="router-view"/>
    </transition>
    <pop-up v-model="showQrcode" style="text-align: center">
      <img src="./assets/qrcode.png"/>
      <div>为了保证最好的用户体验<br/>建议扫描二维码在手机上查看</div>
    </pop-up>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action} from "vuex-class";
import PopUp from "@/components/PopUp.vue";
@Component({
  components: {PopUp}
})
export default class App extends Vue {
  @Action('category/load') readonly loadCategory!: Function
  @Action('record/load') readonly loadRecord!: Function
  transitionName = ''
  pathHistories: string[] = [this.$route.path]
  showQrcode = false

  created() {
    if (document.documentElement.clientWidth > 500) {
      this.showQrcode = true
    }
    this.$router.beforeEach((to, from, next) => {
      function isNavigateBetweenBottomBar(path1: string, path2: string) {
        const arr = ['/record/add', '/statistics', '/record/detail']
        return arr.indexOf(path1) >= 0 && arr.indexOf(path2) >= 0
      }

      const len = this.pathHistories.length
      const lastPath = len - 2 >= 0 ? this.pathHistories[len - 2] : '/'
      if (isNavigateBetweenBottomBar(to.path, from.path)) {
        this.transitionName = ''
        this.pathHistories.push(to.path)
      } else if (lastPath === to.path) {
        this.transitionName = 'router-slide-from-left'
        this.pathHistories.pop()
      } else {
        this.transitionName = 'router-slide-from-right'
        this.pathHistories.push(to.path)
      }
      next()
    })
  }

  mounted() {
    this.loadCategory()
    this.loadRecord()
  }
}
</script>

<style lang="scss">
@import "~@/style/reset.scss";
@import "~@/style/animation.scss";

body {
  max-width: 500px;
  margin: 0 auto;
}

#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.router-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
