<template>
  <div class="mn-support" id="app">
    <router-link class="page-back" v-if="visible" :to="'/'">
      <i class="zugaui zugaui-back"></i>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/base.css'
import './assets/css/mn-support.css'
import './assets/font/iconfont.css'
export default {
  name: 'zui-example',
  components: {
  },
  computed: {
    visible() {
      return ['/'].indexOf(this.$route.path) < 0;
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body, html {
  background-color: #fafafa;
  -webkit-overflow-scrolling: touch;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
img[lazy=loading] {
  transform: scale(0.5);
}
.page-title {
  font-size: 20px;
  margin: auto 20px;
  text-align: center;
  line-height: 1;
}
.page-back {
  display: inline-block;
  top: 12px;
  left: 10px;
  position: absolute;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  text-orientation: upright;
  -webkit-text-orientation: upright;
  z-index: 200;
}
a {
  color: inherit;
}
a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
}
</style>
