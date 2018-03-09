<template>
    <a class="zui-cell" :href="href">
        <span class="zui-cell-mask" v-if="isLink"></span>
        <div class="zui-cell-left">
            <slot name="left"></slot>
        </div>
        <div class="zui-cell-wrapper">
            <div class="zui-cell-title">
                <slot name="icon">
                    <i v-if="icon" class="zui" :class="'zui-' + icon"></i>
                </slot>
                <slot name="title">
                    <span class="zui-cell-text" v-text="title"></span>
                    <span v-if="label" class="zui-cell-label" v-text="label"></span>
                </slot>
            </div>
            <div class="zui-cell-value" :class="{ 'is-link' : isLink }">
                <slot>
                    <span v-text="value"></span>
                </slot>
            </div>
        </div>
        <div class="zui-cell-right">
            <slot name="right"></slot>
        </div>
        <i v-if="isLink" class="zui-cell-allow-right"></i>
    </a>
</template>

<script>

    /**
     * zui-cell
     * @module components/cell
     * @desc 单元格
     * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
     * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .zui-xxx）
     * @param {string} [title] - 标题
     * @param {string} [label] - 备注信息
     * @param {boolean} [is-link=false] - 可点击的链接
     * @param {string} [value] - 右侧显示文字
     * @param {slot} - 同 value, 会覆盖 value 属性
     * @param {slot} [title] - 同 title, 会覆盖 title 属性
     * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
     *
     * @example
     * <zui-cell title="标题文字" icon="back" is-link value="描述文字"></zui-cell>
     * <zui-cell title="标题文字" icon="back">
     *   <div slot="value">描述文字啊哈</div>
     * </zui-cell>
     */
    export default {
        name: 'zui-cell',

        props: {
            to: [String, Object],
            icon: String,
            title: String,
            label: String,
            isLink: Boolean,
            value: {}
        },

        computed: {
            href() {
                if (this.to && !this.added && this.$router) {
                    const resolved = this.$router.match(this.to);
                    if (!resolved.matched.length) return this.to;

                    this.$nextTick(() => {
                        this.added = true;
                        this.$el.addEventListener('click', this.handleClick);
                    });
                    return resolved.path;
                }
                return this.to;
            }
        },

        methods: {
            handleClick($event) {
                $event.preventDefault();
                this.$router.push(this.href);
            }
        }
    };
</script>
<style>
    .zui-cell {
        background-color:#fff;
        box-sizing:border-box;
        color:inherit;
        min-width:48px;
        display:block;
        overflow:hidden;
        position:relative;
        text-decoration:none;
    }
    .zui-cell img {
        vertical-align:middle;
    }
    .zui-cell:first-child .zui-cell-wrapper {
        background-origin:border-box;
    }
    .zui-cell:last-child {
        background-image:-webkit-linear-gradient(right top, #e6e6e6, #e6e6e6 50%, transparent 50%);
        background-image:linear-gradient(90deg, #e6e6e6, #e6e6e6 50%, transparent 50%);
        background-size:1rpx 100%;
        background-repeat:no-repeat;
        background-position:right top;
    }
    .zui-cell-wrapper {
        background-image:-webkit-linear-gradient(left top, #e6e6e6, #e6e6e6 50%, transparent 50%);
        background-image:linear-gradient(90deg, #e6e6e6, #e6e6e6 50%, transparent 50%);
        background-size:1rpx 120%;
        background-repeat:no-repeat;
        background-position:left top;
        background-origin: content-box;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: inherit;
        line-height: 1;
        min-width: inherit;
        overflow: hidden;
        padding: 10px 0;
        width: 100%;
        height: 100%;
    }
    .zui-cell-mask {}
    .zui-cell-mask::after {
        background-color:#000;
        content:" ";
        opacity:0;
        top:0;
        right:0;
        bottom:0;
        left:0;
        position:absolute;
    }
    .zui-cell-mask:active::after {
        opacity:.1;
    }
    .zui-cell-text {
        vertical-align: middle;
    }
    .zui-cell-label {
        color: #a9a9a9;
        display: block;
        font-size: 12px;
        margin-top: 6px;
    }
    .zui-cell-title {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    .zui-cell-value {
        color: #a9a9a9;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .zui-cell-value.is-link {
        margin-bottom:24px;
    }
    .zui-cell-left {
        position: absolute;
        height: 100%;
        left: 0;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
    .zui-cell-right {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
    .zui-cell-allow-right::after {
        border: solid 2px #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        left:50%;
        bottom:20px;
        position: absolute;
        width:5px;
        height:5px;
        -webkit-transform: translateX(-50%) rotate(135deg);
        transform: translateX(-50%) rotate(135deg);
    }
</style>
