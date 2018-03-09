<template>
  <div :class="['zui-spinner-fading-circle circle-color-' + _uid]" :style="{
      width: spinnerSize,
      height: spinnerSize
    }">
    <div v-for="n in 12" :class="['is-circle' + (n + 1)]" class="zui-spinner-fading-circle-circle"></div>
  </div>
</template>
<script>
  import common from './common.vue';

  export default {
    name: 'fading-circle',

    mixins: [common],

    created() {
      if (this.$isServer) return;
      this.styleNode = document.createElement('style');
      const css = `.circle-color-${this._uid} > div::before { background-color: ${this.spinnerColor}; }`;

      this.styleNode.type = 'text/css';
      this.styleNode.rel = 'stylesheet';
      this.styleNode.title = 'fading circle style';
      document.getElementsByTagName('head')[0].appendChild(this.styleNode);
      this.styleNode.appendChild(document.createTextNode(css));
    },

    destroyed() {
      if (this.styleNode) {
        this.styleNode.parentNode.removeChild(this.styleNode);
      }
    }
  };
</script>
<style lang="css">
    .zui-spinner-fading-circle {
        position: relative
    }
    .zui-spinner-fading-circle-circle {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute
    }
    .zui-spinner-fading-circle-circle::before {
        content: " ";
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        border-radius: 100%;
        -webkit-animation: zui-fading-circle 1.2s infinite ease-in-out both;
        animation: zui-fading-circle 1.2s infinite ease-in-out both
    }
    .zui-spinner-fading-circle-circle.is-circle2 {
        -webkit-transform: rotate(30deg);
        transform: rotate(30deg)
    }
    .zui-spinner-fading-circle-circle.is-circle2::before {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s
    }
    .zui-spinner-fading-circle-circle.is-circle3 {
        -webkit-transform: rotate(60deg);
        transform: rotate(60deg)
    }
    .zui-spinner-fading-circle-circle.is-circle3::before {
        -webkit-animation-delay: -1s;
        animation-delay: -1s
    }
    .zui-spinner-fading-circle-circle.is-circle4 {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg)
    }
    .zui-spinner-fading-circle-circle.is-circle4::before {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s
    }
    .zui-spinner-fading-circle-circle.is-circle5 {
        -webkit-transform: rotate(120deg);
        transform: rotate(120deg)
    }
    .zui-spinner-fading-circle-circle.is-circle5::before {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s
    }
    .zui-spinner-fading-circle-circle.is-circle6 {
        -webkit-transform: rotate(150deg);
        transform: rotate(150deg)
    }
    .zui-spinner-fading-circle-circle.is-circle6::before {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s
    }
    .zui-spinner-fading-circle-circle.is-circle7 {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
    .zui-spinner-fading-circle-circle.is-circle7::before {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s
    }
    .zui-spinner-fading-circle-circle.is-circle8 {
        -webkit-transform: rotate(210deg);
        transform: rotate(210deg)
    }
    .zui-spinner-fading-circle-circle.is-circle8::before {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s
    }
    .zui-spinner-fading-circle-circle.is-circle9 {
        -webkit-transform: rotate(240deg);
        transform: rotate(240deg)
    }
    .zui-spinner-fading-circle-circle.is-circle9::before {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s
    }
    .zui-spinner-fading-circle-circle.is-circle10 {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg)
    }
    .zui-spinner-fading-circle-circle.is-circle10::before {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s
    }
    .zui-spinner-fading-circle-circle.is-circle11 {
        -webkit-transform: rotate(300deg);
        transform: rotate(300deg)
    }
    .zui-spinner-fading-circle-circle.is-circle11::before {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s
    }
    .zui-spinner-fading-circle-circle.is-circle12 {
        -webkit-transform: rotate(330deg);
        transform: rotate(330deg)
    }
    .zui-spinner-fading-circle-circle.is-circle12::before {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s
    }
    @-webkit-keyframes zui-fading-circle {
        0%, 39%, 100% {
            opacity: 0
        }
        40% {
            opacity: 1
        }
    }
    @keyframes zui-fading-circle {
        0%, 39%, 100% {
            opacity: 0
        }
        40% {
            opacity: 1
        }
    }
</style>
