<template>
    <div @change="$emit('change', currentValue)" class="zui-checklist" :class="{ 'is-limit': max <= currentValue.length }">
        <label class="zui-checklist-title" v-text="title"></label>
        <x-cell v-for="option in options" :key="option.value || option">
            <label class="zui-checklist-label" slot="title">
                <span :class="{'is-right': align === 'right'}" class="zui-checkbox">
                  <input class="zui-checkbox-input"
                          type="checkbox"
                          v-model="currentValue"
                          :disabled="option.disabled"
                          :value="option.value || option">
                  <span class="zui-checkbox-core"></span>
                </span>
                <span class="zui-checkbox-label" v-text="option.label || option"></span>
            </label>
        </x-cell>
    </div>
</template>

<script>
  import XCell from './Cell.vue';

  /**
   * zui-check-list
   * @module components/checklist
   * @desc 复选框列表，依赖 cell 组件
   *
   * @param {(string[]|object[])} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
   * @param {string[]} value - 选中值的数组
   * @param {string} title - 标题
   * @param {number} [max] - 最多可选的个数
   * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
   *
   *
   * @example
   * <zui-check-list :v-model="value" :options="['a', 'b', 'c']"></zui-check-list>
   */
  export default {
    name: 'zui-check-list',

    props: {
      max: Number,
      title: String,
      align: String,
      options: {
        type: Array,
        required: true
      },
      value: ''
    },

    components: { XCell },

    data() {
      return {
        currentValue: this.value
      };
    },

    computed: {
      limit() {
        return this.max < this.currentValue.length;
      }
    },

    watch: {
      value(val) {
        this.currentValue = val;
      },

      currentValue(val) {
        if (this.limit) val.pop();
        this.$emit('input', val);
      }
    }
  };
</script>
<style>
    .zui-checklist .zui-cell {
        padding: 0;
    }
    .zui-checklist.is-limit .zui-checkbox-core:not(:checked) {
        background-color: #d9d9d9;
        border-color: #d9d9d9;
    }
    .zui-checklist-label {
        display: block;
        padding: 0 10px;
    }
    .zui-checklist-title {
        color: #888;
        display: block;
        font-size: 12px;
        margin: 8px;
    }
    .zui-checkbox {}
    .zui-checkbox.is-right {
        float: right;
    }
    .zui-checkbox-label {
        vertical-align: middle;
        margin-left: 6px;
    }
    .zui-checkbox-input {
        display: none;
    }
    .zui-checkbox-input:checked + .zui-checkbox-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
    }
    .zui-checkbox-input:checked + .zui-checkbox-core::after {
        border-color: #fff;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
    }
    .zui-checkbox-input[disabled] + .zui-checkbox-core {
        background-color: #d9d9d9;
        border-color: #ccc;
    }
    .zui-checkbox-core {
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 1rpx solid #ccc;
        position: relative;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    .zui-checkbox-core::after {
        border: 2px solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        top: 4px;
        left: 7px;
        position: absolute;
        width: 4px;
        height: 8px;
        -webkit-transform: rotate(45deg) scale(0);
        transform: rotate(45deg) scale(0);
        -webkit-transition: -webkit-transform .2s;
        transition: -webkit-transform .2s;
        transition: transform .2s;
        transition: transform .2s, -webkit-transform .2s;
    }
</style>
