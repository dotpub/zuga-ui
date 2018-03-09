<template>
    <label class="zui-switch">
        <input class="zui-switch-input" :disabled="disabled" @change="$emit('change', currentValue)" type="checkbox" v-model="currentValue">
        <span class="zui-switch-core"></span>
        <div class="zui-switch-label"><slot></slot></div>
    </label>
</template>

<script>
  /**
   * zui-switch
   * @module components/switch
   * @desc 切换按钮
   * @param {boolean} [value] - 绑定值，支持双向绑定
   * @param {slot} - 显示内容
   *
   * @example
   * <zui-switch v-model="value"></zui-switch>
   */
  export default {
    name: 'zui-switch',

    props: {
      value: Boolean,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentValue: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    }
  };
</script>
<style>
    .zui-switch {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
         -webkit-box-align: center;
         -ms-flex-align: center;
        align-items: center;
        position: relative;
    }
    .zui-switch * {
        pointer-events: none;
    }
    .zui-switch-label {
        margin-top: 10px;
        display: inline-block;
    }
    .zui-switch-label:empty {
        margin-left: 0;
    }
    .zui-switch-core {
        display: inline-block;
        position: relative;
        height: 52px;
        width: 32px;
        border: 1rpx solid #d9d9d9;
        border-radius: 16px;
        box-sizing: border-box;
        background: #d9d9d9;
    }
    .zui-switch-core::after, .zui-switch-core::before {
        content: " ";
        top: 0;
        left: 0;
        position: absolute;
         -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s, -webkit-transform .3s;
        border-radius: 15px;
    }
    .zui-switch-core::after {
        width: 30px;
        height: 30px;
        background-color: #fff;
        box-shadow: 0 1rpx 3px rgba(0, 0, 0, .4);
    }
    .zui-switch-core::before {
        width: 30px;
        height: 50px;
        background-color: #fdfdfd;
    }
    .zui-switch-input {
        display: none;
    }
    .zui-switch-input:checked + .zui-switch-core {
        border-color: #26a2ff;
        background-color: #26a2ff;
    }
    .zui-switch-input:checked + .zui-switch-core::before {
         -webkit-transform: scale(0);
        transform: scale(0);
    }
    .zui-switch-input:checked + .zui-switch-core::after {
         -webkit-transform: translateY(20px);
        transform: translateY(20px);
    }
</style>
