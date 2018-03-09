<template>
    <div class="vertical-picker" :class="{ 'vertical-picker-3d': rotateEffect }">
        <div class="vertical-picker-toolbar" v-if="showToolbar"><slot></slot></div>
        <div class="vertical-picker-items">
            <vertical-picker-slot v-for="slot in slots" :key="slot.valueIndex" :valueKey="slot.valueKey" :values="slot.values || []" :text-align="slot.textAlign || 'center'" :visible-item-count="visibleItemCount" :class-name="slot.className" :flex="slot.flex" v-model="values[slot.valueIndex]" :rotate-effect="rotateEffect" :divider="slot.divider" :content="slot.content" :itemWidth="itemWidth" :default-index="slot.defaultIndex"></vertical-picker-slot>
            <div class="vertical-picker-center-highlight" :style="{ width: itemWidth + 'px', marginLeft: -itemWidth / 2 + 'px' }"></div>
        </div>
    </div>
</template>
<script>
import VerticalPickerSlot from './VerticalPickerSlot.vue';
export default {
    name: 'zui-vertical-picker',

    componentName: 'vertical-picker',

    props: {
      slots: {
        type: Array
      },
      showToolbar: {
        type: Boolean,
        default: false
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      rotateEffect: {
        type: Boolean,
        default: false
      },
      itemWidth: {
        type: Number,
        default: 36
      }
    },

    created() {
      this.$on('slotValueChange', this.slotValueChange);
      var slots = this.slots || [];
      this.values = [];
      var values = this.values;
      var valueIndexCount = 0;
      slots.forEach(slot => {
        if (!slot.divider) {
          slot.valueIndex = valueIndexCount++;
          values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
          this.slotValueChange();
        }
      });
    },

    methods: {
      slotValueChange() {
        this.$emit('change', this, this.values);
      },

      getSlot(slotIndex) {
        var slots = this.slots || [];
        var count = 0;
        var target;
        var children = this.$children.filter(child => child.$options.name === 'vertical-picker-slot');

        slots.forEach(function(slot, index) {
          if (!slot.divider) {
            if (slotIndex === count) {
              target = children[index];
            }
            count++;
          }
        });

        return target;
      },
      getSlotValue(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.value;
        }
        return null;
      },
      setSlotValue(index, value) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.currentValue = value;
        }
      },
      getSlotValues(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.mutatingValues;
        }
        return null;
      },
      setSlotValues(index, values) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.mutatingValues = values;
        }
      },
      getValues() {
        return this.values;
      },
      setValues(values) {
        var slotCount = this.slotCount;
        values = values || [];
        if (slotCount !== values.length) {
          throw new Error('values length is not equal slot count.');
        }
        values.forEach((value, index) => {
          this.setSlotValue(index, value);
        });
      }
    },

    computed: {
      values() {
        var slots = this.slots || [];
        var values = [];
        slots.forEach(function(slot) {
          if (!slot.divider) values.push(slot.value);
        });

        return values;
      },
      slotCount() {
        var slots = this.slots || [];
        var result = 0;
        slots.forEach(function(slot) {
          if (!slot.divider) result++;
        });
        return result;
      }
    },

    components: {
      'vertical-picker-slot' : VerticalPickerSlot
    }
};
</script>
<style>
  .vertical-picker {
    overflow: hidden;
  }

  .vertical-picker-toolbar {
    width: 40px;
  }

  .vertical-picker-items {
    display: flex;
    justify-content: center;
    padding: 0;
    text-align: right;
    font-size: 24px;
    position: relative;
  }

  .vertical-picker-center-highlight {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    height: 100%;
    left: 50%;
    margin-left: -18px;
    pointer-events: none
  }

  .vertical-picker-center-highlight:before,
  .vertical-picker-center-highlight:after {
    content: '';
    position: absolute;
    width: 1rpx;
    height: 100%;
    background-color: #eaeaea;
    display: block;
    z-index: 15;
    transform: scaleX(0.5);
  }

  .vertical-picker-center-highlight:before {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
  }

  .vertical-picker-center-highlight:after {
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
  }
</style>
