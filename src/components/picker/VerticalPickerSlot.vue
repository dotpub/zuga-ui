<template>
    <div class="vertical-picker-slot" :class="classNames" :style="flexStyle">
        <div v-if="!divider" ref="wrapper" class="vertical-picker-slot-wrapper" :class="{ dragging: dragging }" :style="{ width: contentHeight + 'px' }">
            <div class="vertical-picker-item" v-for="itemValue in mutatingValues" @click="onItemClick(itemValue)" :class="{ 'vertical-picker-selected': itemValue === currentValue }" :style="{ width: itemWidth + 'px', lineHeight: itemWidth + 'px' }">
              {{ typeof itemValue === 'object' && itemValue[valueKey] ? itemValue[valueKey] : itemValue }}
            </div>
        </div>
        <div v-if="divider">{{ content }}</div>
    </div>
</template>
<script type="text/babel">
  import draggable from './draggable';
  import translateUtil from './translate';
  import { once, addClass, removeClass } from '../../utils/dom';
  import emitter from '../../mixins/emitter';

  var rotateElement = function(element, angle) {
    if (!element) return;
    var transformProperty = translateUtil.transformProperty;

    element.style[transformProperty] = element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, '') + ` rotateX(${angle}deg)`;
  };

  const ITEM_WIDTH = 36;
  const VISIBLE_ITEMS_ANGLE_MAP = {
    3: -45,
    5: -20,
    7: -15
  };

  export default {
    name: 'vertical-picker-slot',

    props: {
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      value: {},
      visibleItemCount: {
        type: Number,
        default: 5
      },
      valueKey: String,
      rotateEffect: {
        type: Boolean,
        default: false
      },
      divider: {
        type: Boolean,
        default: false
      },
      textAlign: {
        type: String,
        default: 'center'
      },
      flex: {},
      className: {},
      content: {},
      itemWidth: {
        type: Number,
        default: ITEM_WIDTH
      },
      defaultIndex: {
        type: Number,
        default: 0,
        require: false
      }
    },

    data() {
      return {
        currentValue: this.value,
        mutatingValues: this.values,
        dragging: false,
        animationFrameId: null
      };
    },

    mixins: [emitter],

    computed: {
      flexStyle() {
        return {
          'flex': this.flex,
          '-webkit-box-flex': this.flex,
          '-moz-box-flex': this.flex,
          '-ms-flex': this.flex
        };
      },
      classNames() {
        const PREFIX = 'vertical-picker-slot-';
        let resultArray = [];

        if (this.rotateEffect) {
          resultArray.push(PREFIX + 'absolute');
        }

        let textAlign = this.textAlign || 'center';
        resultArray.push(PREFIX + textAlign);

        if (this.divider) {
          resultArray.push(PREFIX + 'divider');
        }

        if (this.className) {
          resultArray.push(this.className);
        }

        return resultArray.join(' ');
      },
      contentHeight() {
        return this.itemWidth * this.visibleItemCount;
      },
      valueIndex() {
        return this.mutatingValues.indexOf(this.currentValue);
      },
      dragRange() {
        var values = this.mutatingValues;
        var visibleItemCount = this.visibleItemCount;
        var itemWidth = this.itemWidth;

        return [ -itemWidth * (values.length - Math.ceil(visibleItemCount / 2)), itemWidth * Math.floor(visibleItemCount / 2) ];
      }
    },

    methods: {
      value2Translate(value) {
        var values = this.mutatingValues;
        var valueIndex = values.indexOf(value);
        var offset = Math.floor(this.visibleItemCount / 2);
        var itemWidth = this.itemWidth;

        if (valueIndex !== -1) {
          return (valueIndex - offset) * -itemWidth;
        }
      },

      translate2Value(translate) {
        var itemWidth = this.itemWidth;
        translate = Math.round(translate / itemWidth) * itemWidth;
        var index = -(translate - Math.floor(this.visibleItemCount / 2) * itemWidth) / itemWidth;
        return this.mutatingValues[index];
      },

      updateRotate: function(currentTranslate, pickerItems) {
        if (this.divider) return;
        var dragRange = this.dragRange;
        var wrapper = this.$refs.wrapper;

        if (!pickerItems) {
          pickerItems = wrapper.querySelectorAll('.vertical-picker-item');
        }

        if (currentTranslate === undefined) {
          currentTranslate = translateUtil.getElementTranslate(wrapper).top;
        }

        var itemsFit = Math.ceil(this.visibleItemCount / 2);
        var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;

        [].forEach.call(pickerItems, (item, index) => {
          var itemOffsetLeft = index * this.itemWidth;
          var translateOffset = dragRange[1] - currentTranslate;
          var itemOffset = itemOffsetLeft - translateOffset;
          var percentage = itemOffset / this.itemWidth;

          var angle = angleUnit * percentage;
          if (angle > 180) angle = 180;
          if (angle < -180) angle = -180;

          rotateElement(item, angle);

          if (Math.abs(percentage) > itemsFit) {
            addClass(item, 'vertical-picker-item-far');
          } else {
            removeClass(item, 'vertical-picker-item-far');
          }
        });
      },

      planUpdateRotate: function() {
        var el = this.$refs.wrapper;
        cancelAnimationFrame(this.animationFrameId);

        this.animationFrameId = requestAnimationFrame(() => {
          this.updateRotate();
        });

        once(el, translateUtil.transitionEndProperty, () => {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        });
      },

      initEvents() {
        var el = this.$refs.wrapper;
        var dragState = {};

        var velocityTranslate, prevTranslate, pickerItems;

        draggable(el, {
          start: (event) => {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            dragState = {
              range: this.dragRange,
              start: new Date(),
              startLeft: event.pageX,
              startTop: event.pageY,
              startTranslateLeft: translateUtil.getElementTranslate(el).left
            };
            pickerItems = el.querySelectorAll('.vertical-picker-item');
          },

          drag: (event) => {
            this.dragging = true;

            dragState.left = event.pageX;
            dragState.top = event.pageY;

            var deltaX = dragState.left - dragState.startLeft;
            var translate = dragState.startTranslateLeft + deltaX;

            translateUtil.translateElement(el, translate, null);

            velocityTranslate = translate - prevTranslate || translate;

            prevTranslate = translate;

            if (this.rotateEffect) {
              this.updateRotate(prevTranslate, pickerItems);
            }
          },

          end: () => {
            if (this.dragging) {
              this.dragging = false;

              var momentumRatio = 7;
              var currentTranslate = translateUtil.getElementTranslate(el).left;
              var duration = new Date() - dragState.start;

              var momentumTranslate;
              if (duration < 300) {
                momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
              }

              var dragRange = dragState.range;

              this.$nextTick(() => {
                var translate;
                var itemWidth = this.itemWidth;
                if (momentumTranslate) {
                  translate = Math.round(momentumTranslate / itemWidth) * itemWidth;
                } else {
                  translate = Math.round(currentTranslate / itemWidth) * itemWidth;
                }

                translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);

                translateUtil.translateElement(el, translate, null);

                this.currentValue = this.translate2Value(translate);

                if (this.rotateEffect) {
                  this.planUpdateRotate();
                }
              });
            }

            dragState = {};
          }
        });
      },

      doOnValueChange() {
        var value = this.currentValue;
        var wrapper = this.$refs.wrapper;

        translateUtil.translateElement(wrapper, this.value2Translate(value), null);
      },

      doOnValuesChange() {
        var el = this.$el;
        var items = el.querySelectorAll('.vertical-picker-item');
        [].forEach.call(items, (item, index) => {
          translateUtil.translateElement(item, this.itemWidth * index, null);
        });
        if (this.rotateEffect) {
          this.planUpdateRotate();
        }
      },

      onItemClick(index) {
        this.currentValue = index;
      }
    },

    mounted() {
      this.ready = true;
      this.$emit('input', this.currentValue);

      if (!this.divider) {
        this.initEvents();
        this.doOnValueChange();
      }

      if (this.rotateEffect) {
        this.doOnValuesChange();
      }
    },

    watch: {
      values(val) {
        this.mutatingValues = val;
      },

      mutatingValues(val) {
        if (this.valueIndex === -1) {
          this.currentValue = (val || [])[0];
        }
        if (this.rotateEffect) {
          this.$nextTick(() => {
            this.doOnValuesChange();
          });
        }
      },
      currentValue(val) {
        this.doOnValueChange();
        if (this.rotateEffect) {
          this.planUpdateRotate();
        }
        this.$emit('input', val);
        this.dispatch('vertical-picker', 'slotValueChange', this);
      },
      defaultIndex(val) {
        if ((this.mutatingValues[val] !== undefined) && (this.mutatingValues.length >= val + 1)) {
          this.currentValue = this.mutatingValues[val];
        }
      }
    }
  };
</script>
<style>
  .vertical-picker-slot {
    font-size: 18px;
    overflow: hidden;
    position: relative;
    max-width: 100%
  }

  .vertical-picker-slot.vertical-picker-slot-left {
    text-align: left;
  }

  .vertical-picker-slot.vertical-picker-slot-center {
    text-align: center;
  }

  .vertical-picker-slot.vertical-picker-slot-right {
    text-align: right;
  }

  .vertical-picker-slot.vertical-picker-slot-divider {
    color: #000;
    display: flex;
    align-items: center
  }

  .vertical-picker-slot-wrapper {
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.21, 0.71, 0.57, 1.13);
    backface-visibility: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .vertical-picker-slot-wrapper.dragging,
  .vertical-picker-slot-wrapper.dragging .vertical-picker-item {
    transition-duration: 0s;
  }

  .vertical-picker-item {
    width: 36px;
    line-height: 36px;
    padding: 10px 0;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #707274;
    left: 0;
    top: 0;
    height: 100%;
    box-sizing: border-box;
    transition-duration: .3s;
    backface-visibility: hidden;
  }

  .vertical-picker-slot-absolute .vertical-picker-item {
    position: absolute;
  }

  .vertical-picker-item.vertical-picker-item-far {
    pointer-events: none
  }

  .vertical-picker-item.vertical-picker-selected {
    color: #000;
    transform: translate3d(0, 0, 0) rotateX(0);
  }

  .vertical-picker-3d .vertical-picker-items {
    overflow: hidden;
    perspective: 700px;
  }

  .vertical-picker-3d .vertical-picker-item,
  .vertical-picker-3d .vertical-picker-slot,
  .vertical-picker-3d .vertical-picker-slot-wrapper {
    transform-style: preserve-3d
  }

  .vertical-picker-3d .vertical-picker-slot {
    overflow: visible
  }

  .vertical-picker-3d .vertical-picker-item {
    transform-origin: center center;
    backface-visibility: hidden;
    transition-timing-function: ease-out
  }
</style>
