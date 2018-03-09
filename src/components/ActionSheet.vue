<template>
    <transition name="action-sheet-float">
        <div v-show="currentValue" class="zui-action-sheet">
            <ul class="zui-action-sheet-list" :style="{ 'margin-right': cancelText ? '5px' : '0' }">
                <li v-for="( item, index ) in actions" class="zui-action-sheet-listitem" @click.stop="itemClick(item, index)">{{ item.name }}</li>
            </ul>
            <a class="zui-action-sheet-button" @click.stop="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
        </div>
    </transition>
</template>

<style>
    .zui-action-sheet {
        position: absolute;
        background: #e0e0e0;
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
    .zui-action-sheet-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .zui-action-sheet-listitem {
        border-right: solid 1rpx #e0e0e0;
    }
    .zui-action-sheet-listitem, .zui-action-sheet-button {
        display: block;
        height: 100%;
        width: 45px;
        line-height: 45px;
        font-size: 18px;
        color: #333;
        background-color: #fff;
    }
    .zui-action-sheet-listitem:active, .zui-action-sheet-button:active {
        background-color: #f0f0f0;
    }
    .action-sheet-float-enter, .action-sheet-float-leave-active {
        -webkit-transform: translate3d(100%, -50%, 0);
        transform: translate3d(100%, -50%, 0);
    }
</style>

<script type="text/babel">
  import Popup from '../utils/popup';
  import '../style/popup.css';

  export default {
    name: 'zui-action-sheet',

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

      cancelText: {
        type: String,
        default: '取消'
      },

      actions: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        currentValue: false
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
      itemClick(item, index) {
        if (item.method && typeof item.method === 'function') {
          item.method(item, index);
        }
        this.currentValue = false;
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    }
  };
</script>
