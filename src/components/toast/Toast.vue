<template>
  <transition name="zui-toast-pop">
    <div class="zui-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
      <i class="zui-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="zui-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    customClass() {
      var classes = [];
      switch (this.position) {
        case 'top':
          classes.push('is-placetop');
          break;
        case 'bottom':
          classes.push('is-placebottom');
          break;
        default:
          classes.push('is-placemiddle');
      }
      classes.push(this.className);
      return classes.join(' ');
    }
  }
};
</script>
<style>
.zui-toast {
  position: fixed;
  max-width: 80%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  -webkit-transition: opacity .3s linear;
  transition: opacity .3s linear
}
.zui-toast.is-placebottom {
  bottom: 50px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0)
}
.zui-toast.is-placemiddle {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%)
}
.zui-toast.is-placetop {
  top: 50px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0)
}
.zui-toast-icon {
  display: block;
  text-align: center;
  font-size: 20px
}
.zui-toast-text {
  font-size: 14px;
  display: block;
  text-align: center;
  writing-mode: vertical-lr;
  text-orientation: sideways;
  -webkit-text-orientation: sideways;
}
.zui-toast-pop-enter, .zui-toast-pop-leave-active {
  opacity: 0
}
</style>
