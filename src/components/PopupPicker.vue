<template>
  <transition name="action-sheet-float">
    <div v-show="currentValue" class="zui-popup-picker">
      <zui-vertical-picker
        @change="onChange"
        :slots="slots"
        :visible-item-count="5"
        showToolbar>
        <a class="zui-popup-picker-action zui-popup-picker-cancel" @click.stop="currentValue = false;$emit('cancel')">{{ cancelText }}</a>
        <a class="zui-popup-picker-action zui-popup-picker-confirm" @click.stop="confirm">{{ confirmText }}</a>
      </zui-vertical-picker>
    </div>
  </transition>
</template>

<style>
  .zui-popup-picker {
    position: fixed;
    background: #ffffff;
    height: 80%;
    text-align: center;
    right: 0;
    top: 50%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform .3s ease-out;
    transition: -webkit-transform .3s ease-out;
    transition: transform .3s ease-out;
    transition: transform .3s ease-out, -webkit-transform .3s ease-out;
  }
  .zui-popup-picker .vertical-picker-slot-wrapper, .zui-popup-picker .vertical-picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .action-sheet-float-enter, .action-sheet-float-leave-active {
    -webkit-transform: translate3d(100%, -50%, 0);
    transform: translate3d(100%, -50%, 0);
  }
  .zui-popup-picker .vertical-picker-toolbar {
    border-right: solid 1rpx #eaeaea;
  }
  .zui-popup-picker-action {
    display: inline-block;
    height: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #26a2ff;
  }
  .zui-popup-picker-cancel {
    float: left;
  }
  .zui-popup-picker-confirm {
    float: right;
  }
</style>

<script type="text/babel">
  import Popup from './Popup.vue';
  import VerticalPicker from "./picker/VerticalPicker";

  export default {
    components: {
      'zui-vertical-picker' : VerticalPicker,
      'zui-popup': Popup
    },
    name: 'zui-popup-picker',

    mixins: [Popup],

    props: {
      modal: {
        default: true
      },

      modalFade: {
        default: true
      },

      lockScroll: {
        default: false
      },

      closeOnClickModal: {
        default: true
      },

      confirmText: {
        type: String,
        default: 'ok'
      },

      cancelText: {
        type: String,
        default: 'cancel'
      },

      slots: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        currentValue: false,
        selectedValue : null
      };
    },

    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },

    methods: {
      onChange(picker, values) {
        this.selectedValue = values;
        this.$emit('change', picker, this.selectedValue);
      },
      confirm() {
        this.$emit('confirm', this.selectedValue);
        this.currentValue = false;
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.selectedValue =
        this.open();

      }
    },
    created() {

    }
  };
</script>
