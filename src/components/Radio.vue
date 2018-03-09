<template>
    <div class="zui-radio-list" @change="$emit('change', currentValue)">
        <label class="zui-radio-list-title" v-text="title"></label>
        <x-cell v-for="option in options" :key="option.value || option">
            <label class="zui-radio-list-label" slot="title">
        <span
                :class="{'is-right': align === 'right'}"
                class="zui-radio">
          <input
                  class="zui-radio-input"
                  type="radio"
                  v-model="currentValue"
                  :disabled="option.disabled"
                  :value="option.value || option">
          <span class="zui-radio-core"></span>
        </span>
                <span class="zui-radio-label" v-text="option.label || option"></span>
            </label>
        </x-cell>
    </div>
</template>

<script>
  import XCell from './Cell.vue';
  /**
   * zui-radio
   * @module components/radio
   * @desc 单选框列表，依赖 cell 组件
   *
   * @param {string[], object[]} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
   * @param {string} value - 选中值
   * @param {string} title - 标题
   * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
   *
   * @example
   * <zui-radio v-model="value" :options="['a', 'b', 'c']"></zui-radio>
   */
  export default {
    name: 'zui-radio',

    props: {
      title: String,
      align: String,
      options: {
        type: Array,
        required: true
      },
      value: String
    },

    data() {
      return {
        currentValue: this.value
      };
    },

    watch: {
      value(val) {
        this.currentValue = val;
      },

      currentValue(val) {
        this.$emit('input', val);
      }
    },

    components: {
      XCell
    }
  };
</script>
<style>
    .zui-radio-list .zui-cell {
        padding: 0;
    }
    .zui-radio-list-label {
        display: block;
        padding: 0 10px;
    }
    .zui-radio-list-title {
        font-size: 12px;
        margin: 8px;
        display: block;
        color: #888;
    }
    .zui-radio {}
    .zui-radio.is-right {
        float: right;
    }
    .zui-radio-label {
        vertical-align: middle;
        margin-left: 6px;
    }
    .zui-radio-input {
        display: none;
    }
    .zui-radio-input:checked + .zui-radio-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
    }
    .zui-radio-input:checked + .zui-radio-core::after {
        background-color: #fff;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    .zui-radio-input[disabled] + .zui-radio-core {
        background-color: #d9d9d9;
        border-color: #ccc;
    }
    .zui-radio-core {
        box-sizing: border-box;
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 1rpx solid #ccc;
        position: relative;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    .zui-radio-core::after {
        content: " ";
        border-radius: 100%;
        top: 5px;
        left: 5px;
        position: absolute;
        width: 8px;
        height: 8px;
        -webkit-transition: -webkit-transform .2s;
        transition: -webkit-transform .2s;
        transition: transform .2s;
        transition: transform .2s, -webkit-transform .2s;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
</style>
