<template>
    <span :type="nativeType"
            class="zui-button"
            :class="['zui-button-' + type, 'zui-button-' + size, {
              'is-disabled': disabled,
              'is-plain': plain
            }]"
            @click="handleClick"
            :disabled="disabled">
        <span class="zui-button-icon" v-if="icon || $slots.icon">
          <slot name="icon">
            <i v-if="icon" class="zui" :class="'zui-' + icon"></i>
          </slot>
        </span>
        <label class="zui-button-text"><slot></slot></label>
    </span>
</template>

<script>

    /**
     * zui-header
     * @module components/button
     * @desc 按钮
     * @param {string} [type=default] - 显示类型，接受 default, primary, danger
     * @param {boolean} [disabled=false] - 禁用
     * @param {boolean} [plain=false] - 幽灵按钮
     * @param {string} [size=normal] - 尺寸，接受 normal, small, large
     * @param {string} [native-type] - 原生 type 属性
     * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .zui-xxx）
     * @param {slot} - 显示文本
     * @param {slot} [icon] 显示图标
     *
     * @example
     * <zui-button size="large" icon="back" type="primary">按钮</zui-button>
     */
    export default {
        name: 'zui-button',

        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        },

        props: {
            icon: String,
            disabled: Boolean,
            nativeType: String,
            plain: Boolean,
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return [
                            'default',
                            'danger',
                            'primary',
                            'light'
                        ].indexOf(value) > -1;
                }
            },
            size: {
                type: String,
                default: 'normal',
                validator(value) {
                    return [
                            'xsmall',
                            'small',
                            'normal',
                            'large'
                        ].indexOf(value) > -1;
                }
            }
        }
    };
</script>
<style>
    .zui-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        color: inherit;
        display: block;
        font-size: 18px;
        width: 41px;
        line-height: 41px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center
    }
    .zui-button::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute
    }
    .zui-button:not(.is-disabled):active::after {
        opacity: .4
    }
    .zui-button.is-disabled {
        opacity: .6
    }
    .zui-button-icon {
        vertical-align: middle;
        display: inline-block
    }
    .zui-button-default {
        color: #656b79;
        background-color: #f6f8fa;
        box-shadow: 0 0 1rpx #b8bbbf
    }
    .zui-button-default.is-plain {
        border: 1rpx solid #5a5a5a;
        background-color: transparent;
        box-shadow: none;
        color: #5a5a5a
    }
    .zui-button-primary {
        color: #fff;
        background-color: #26a2ff
    }
    .zui-button-primary.is-plain {
        border: 1rpx solid #26a2ff;
        background-color: transparent;
        color: #26a2ff
    }
    .zui-button-danger {
        color: #fff;
        background-color: #ef4f4f
    }
    .zui-button-danger.is-plain {
        border: 1rpx solid #ef4f4f;
        background-color: transparent;
        color: #ef4f4f
    }
    .zui-button-large {
        display: block;
        height: 100%
    }
    .zui-button-normal {
        display: inline-block;
        padding: 12px 0
    }
    .zui-button-small {
        display: inline-block;
        font-size: 14px;
        padding: 12px 0;
        width: 33px;
        line-height: 30px;
    }
</style>
