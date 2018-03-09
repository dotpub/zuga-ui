<template>
  <div class="zui-spinner-triple-bounce">
    <div class="zui-spinner-triple-bounce-bounce1" :style="bounceStyle"></div>
    <div class="zui-spinner-triple-bounce-bounce2" :style="bounceStyle"></div>
    <div class="zui-spinner-triple-bounce-bounce3" :style="bounceStyle"></div>
  </div>
</template>
<script>
  import common from './common.vue';

  export default {
    name: 'triple-bounce',

    mixins: [common],

    computed: {
      spinnerSize() {
        return ((this.size || this.$parent.size || 28) / 3) + 'px';
      },

      bounceStyle() {
        return {
          width: this.spinnerSize,
          height: this.spinnerSize,
          backgroundColor: this.spinnerColor
        };
      }
    }
  };
</script>
<style lang="css">
    .zui-spinner-triple-bounce {}
    .zui-spinner-triple-bounce-bounce1, .zui-spinner-triple-bounce-bounce2, .zui-spinner-triple-bounce-bounce3 {
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: zui-spinner-triple-bounce 1.4s infinite ease-in-out both;
        animation: zui-spinner-triple-bounce 1.4s infinite ease-in-out both;
    }
    .zui-spinner-triple-bounce-bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    .zui-spinner-triple-bounce-bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
    @-webkit-keyframes zui-spinner-triple-bounce {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }
    @keyframes zui-spinner-triple-bounce {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }
</style>
