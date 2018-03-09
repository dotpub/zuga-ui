<template>
    <x-cell class="zui-field"
            :title="label"
            v-clickoutside="doCloseActive"
            :class="[{
              'is-textarea': type === 'textarea',
              'is-nolabel': !label
            }]" :isLink="isLink">
    <textarea lang="mn"
            @change="$emit('change', currentValue)"
            ref="textarea"
            class="zui-field-core"
            :placeholder="placeholder"
            v-if="type === 'textarea'"
            :rows="rows"
            :disabled="disabled"
            :readonly="readonly"
            v-model="currentValue">
    </textarea>
        <input lang="mn"
                @change="$emit('change', currentValue)"
                ref="input"
                class="zui-field-core"
                :placeholder="placeholder"
                :number="type === 'number'"
                v-else
                :type="type"
                @focus="active = true"
                :disabled="disabled"
                :readonly="readonly"
                :value="currentValue"
                @input="handleInput">

        <div @click="handleClear"
                class="zui-field-clear"
                v-if="!disableClear"
                v-show="currentValue && type !== 'textarea' && active">
            <i class="zui zui-field-error"></i>
        </div>
        <span class="zui-field-state" v-if="state" :class="['is-' + state]">
          <i class="zui" :class="['zui-field-' + state]"></i>
        </span>
        <div class="zui-field-other">
            <slot></slot>
        </div>
    </x-cell>
</template>

<script>
  import XCell from './Cell.vue';
  import Clickoutside from '../utils/clickoutside';

  /**
   * zui-field
   * @desc 编辑器，依赖 cell
   * @module components/field
   *
   * @param {string} [type=text] - field 类型，接受 text, textarea 等
   * @param {string} [label] - 标签
   * @param {string} [rows] - textarea 的 rows
   * @param {string} [placeholder] - placeholder
   * @param {string} [disabled] - disabled
   * @param {string} [readonly] - readonly
   * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
   *
   * @example
   * <zui-field v-model="value" label="用户名"></zui-field>
   * <zui-field v-model="value" label="密码" placeholder="请输入密码"></zui-field>
   * <zui-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></zui-field>
   * <zui-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></zui-field>
   */
  export default {
    name: 'zui-field',

    data() {
      return {
        active: false,
        currentValue: this.value
      };
    },

    directives: {
      Clickoutside
    },

    props: {
      type: {
        type: String,
        default: 'text'
      },
      rows: String,
      label: String,
      placeholder: String,
      readonly: Boolean,
      disabled: Boolean,
      disableClear: Boolean,
      state: {
        type: String,
        default: 'default'
      },
      value: {},
      attr: Object,
      isLink: Boolean
    },

    components: { XCell },

    methods: {
      doCloseActive() {
        this.active = false;
      },

      handleInput(evt) {
        this.currentValue = evt.target.value;
      },

      handleClear() {
        if (this.disabled || this.readonly) return;
        this.currentValue = '';
      }
    },

    watch: {
      value(val) {
        this.currentValue = val;
      },

      currentValue(val) {
        this.$emit('input', val);
      },

      attr: {
        immediate: true,
        handler(attrs) {
          this.$nextTick(() => {
            const target = [this.$refs.input, this.$refs.textarea];
            target.forEach(el => {
              if (!el || !attrs) return;
              Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
            });
          });
        }
      }
    }
  };
</script>
<style>
.zui-field {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.zui-field .zui-cell-title {
    height: 105px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
}
.zui-field .zui-cell-value {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.zui-field.is-nolabel .zui-cell-title {
    display: none;
}
.zui-field.is-textarea {
    -webkit-box-align: inherit;
    -ms-flex-align: inherit;
    align-items: inherit;
}
.zui-field.is-textarea .zui-cell-title {
    padding: 0 10px;
}
.zui-field.is-textarea .zui-cell-value {
    padding: 0 10px;
}
.zui-field-core {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.2;
    font-size: inherit;
    display: table-cell;
    font-family: inherit;
}
.zui-field-core[readonly] {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.zui-field-clear {
    opacity: .2;
}
.zui-field-state {
    color: inherit;
    margin-top: 20px;
}
.zui-field-state .zui {
    font-size: 20px;
}
.zui-field-state.is-default {
    margin-top: 0;
}
.zui-field-state.is-success {
    color: #4caf50;
}
.zui-field-state.is-warning {
    color: #ffc107;
}
.zui-field-state.is-error {
    color: #f44336;
}
.zui-field-other {
    top: 0;
    right: 0;
    position: relative;
}
</style>
