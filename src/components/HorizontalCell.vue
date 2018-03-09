<template>
    <a class="zui-horizontal-cell" :href="href">
        <span class="zui-horizontal-cell-mask" v-if="isLink"></span>
        <div class="zui-horizontal-cell-left">
            <slot name="left"></slot>
        </div>
        <div class="zui-horizontal-cell-wrapper">
            <div class="zui-horizontal-cell-title">
                <slot name="icon">
                    <i v-if="icon" class="zui" :class="'zui-horizontal-' + icon"></i>
                </slot>
                <slot name="title">
                    <span class="zui-horizontal-cell-text" v-text="title"></span>
                    <span v-if="label" class="zui-horizontal-cell-label" v-text="label"></span>
                </slot>
            </div>
            <div class="zui-horizontal-cell-value" :class="{ 'is-link' : isLink }">
                <slot>
                    <span v-text="value"></span>
                </slot>
            </div>
        </div>
        <div class="zui-horizontal-cell-right">
            <slot name="right"></slot>
        </div>
        <i v-if="isLink" class="zui-horizontal-cell-allow-right"></i>
    </a>
</template>

<script>

    /**
     * zui-horizontal-cell
     * @module components/cell
     * @desc 单元格
     * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
     * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .zui-horizontal-xxx）
     * @param {string} [title] - 标题
     * @param {string} [label] - 备注信息
     * @param {boolean} [is-link=false] - 可点击的链接
     * @param {string} [value] - 右侧显示文字
     * @param {slot} - 同 value, 会覆盖 value 属性
     * @param {slot} [title] - 同 title, 会覆盖 title 属性
     * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
     *
     * @example
     * <zui-horizontal-cell title="标题文字" icon="back" is-link value="描述文字"></zui-horizontal-cell>
     * <zui-horizontal-cell title="标题文字" icon="back">
     *   <div slot="value">描述文字啊哈</div>
     * </zui-horizontal-cell>
     */
    export default {
        name: 'zui-horizontal-cell',

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
.zui-horizontal-cell {
    background-color:#fff;
    box-sizing:border-box;
    color:inherit;
    min-height:48px;
    display:block;
    overflow:hidden;
    position:relative;
    text-decoration:none;
}
.zui-horizontal-cell img {
    vertical-align:middle;
}
.zui-horizontal-cell:first-child .zui-horizontal-cell-wrapper {
    background-origin:border-box;
}
.zui-horizontal-cell:last-child {
    background-image:-webkit-linear-gradient(bottom, #e6e6e6, #e6e6e6 50%, transparent 50%);
    background-image:linear-gradient(0deg, #e6e6e6, #e6e6e6 50%, transparent 50%);
    background-size:100% 1rpx;
    background-repeat:no-repeat;
    background-position:bottom;
}
.zui-horizontal-cell-wrapper {
    background-image:-webkit-linear-gradient(top, #e6e6e6, #e6e6e6 50%, transparent 50%);
    background-image:linear-gradient(180deg, #e6e6e6, #e6e6e6 50%, transparent 50%);
    background-size: 120% 1rpx;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: content-box;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
}
.zui-horizontal-cell-mask {}
.zui-horizontal-cell-mask::after {
    background-color:#000;
    content:" ";
    opacity:0;
    top:0;
    right:0;
    bottom:0;
    left:0;
    position:absolute;
}
.zui-horizontal-cell-mask:active::after {
    opacity:.1;
}
.zui-horizontal-cell-text {
    vertical-align: middle;
}
.zui-horizontal-cell-label {
    color: #888;
    display: block;
    font-size: 12px;
    margin-top: 6px;
}
.zui-horizontal-cell-title {
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
}
.zui-horizontal-cell-value {
    color: #888;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.zui-horizontal-cell-value.is-link {
    margin-right:24px;
}
.zui-horizontal-cell-left {
    position: absolute;
    height: 100%;
    left: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
}
.zui-horizontal-cell-right {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
}
.zui-horizontal-cell-allow-right::after {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top:50%;
    right:20px;
    position: absolute;
    width:5px;
    height:5px;
    -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
}
</style>
