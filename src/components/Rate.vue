<template>
  <div :class="classes" @mouseleave="handleMouseleave">
    <input type="hidden" :name="name" :value="currentValue">
    <div
      v-for="item in count"
      :class="starCls(item)"
      @click.stop="handleClick(item)">
      <span :class="[prefixCls + '-star-content']" :style="{'height' : ((currentValue - Math.floor(currentValue)) * 100) + '%'}" type="half"></span>
    </div>
    <div :class="[prefixCls + '-text']" v-if="showText" v-show="currentValue > 0">
      <slot><span>{{ currentValue }}</span> <span v-if="currentValue <= 1"></span><span v-else></span></slot>
    </div>
  </div>
</template>
<script>
import Emitter from '../mixins/emitter';
const prefixCls = 'zui-rate';
export default {
  name: 'zui-rate',
  mixins: [ Emitter ],
  props: {
    count: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      hoverIndex: -1,
      isHover: false,
      isHalf: this.allowHalf && this.value.toString().indexOf('.') >= 0,
      currentValue: this.value
    };
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled
        }
      ];
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    },
    currentValue (val) {
      this.setHalf(val);
    }
  },
  methods: {
    starCls (value) {
      const hoverIndex = this.hoverIndex;
      const currentIndex = this.isHover ? hoverIndex : this.currentValue;
      let full = false;
      let isLast = false;
      if (currentIndex >= value) full = true;
      if (this.isHover) {
        isLast = currentIndex === value;
      } else {
        isLast = Math.ceil(this.currentValue) === value;
      }
      return [
        `${prefixCls}-star`,
        {
          [`${prefixCls}-star-full`]: (!isLast && full) || (isLast && !this.isHalf),
          [`${prefixCls}-star-half`]: isLast && this.isHalf,
          [`${prefixCls}-star-zero`]: !full
        }
      ];
    },
    handleMousemove(value, event) {
      if (this.disabled) return;
      this.isHover = true;
      if (this.allowHalf) {
        const type = event.target.getAttribute('type') || false;
        this.isHalf = type === 'half';
      } else {
        this.isHalf = false;
      }
      this.hoverIndex = value;
    },
    handleMouseleave () {
      if (this.disabled) return;
      this.isHover = false;
      this.setHalf(this.currentValue);
      this.hoverIndex = -1;
    },
    setHalf (val) {
      this.isHalf = this.allowHalf && val.toString().indexOf('.') >= 0;
    },
    handleClick (value) {
      if (this.disabled) return;
      if (this.isHalf) value -= 0.5;
      this.currentValue = value;
      this.$emit('input', value);
      this.$emit('on-change', value);
      this.dispatch('FormItem', 'on-form-change', value);
    }
  }
};
</script>
<style>
.zui-rate {
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 20px;
  vertical-align: middle;
  font-weight: normal;
  font-style: normal;
}
.zui-rate-disabled .zui-rate-star:before,
.zui-rate-disabled .zui-rate-star-content:before {
  cursor: default;
}
.zui-rate-disabled .zui-rate-star:hover {
  transform: scale(1);
}
.zui-rate-star {
  display: inline-block;
  margin: 0;
  padding: 0;
  margin-bottom: 4px;
  position: relative;
  font-family: 'zui';
  transition: all 0.3s ease;
}
.zui-rate-star:hover {
  transform: scale(1.1);
}
.zui-rate-star:before,
.zui-rate-star-content:before {
  color: #e9e9e9;
  cursor: pointer;
  content: "\e611";
  transition: all .2s ease-in-out;
  display: block;
}
.zui-rate-star-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
}
.zui-rate-star-content:before {
  color: transparent;
}
.zui-rate-star-half .zui-rate-star-content:before,
.zui-rate-star-full:before {
  color: #ffd820;
}
.zui-rate-star-half:hover .zui-rate-star-content:before,
.zui-rate-star-full:hover:before {
  color: #ffd138;
}
.zui-rate-text {
  margin-top: 8px;
  vertical-align: middle;
  display: inline-block;
  font-size: 14px;
  color: #ff4a46;
}
</style>
