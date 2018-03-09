<template>
  <div class="page-datetime">
    <h1 class="page-title">Datetime Picker</h1>
    <div class="page-datetime-wrapper">
      <zui-button @click.native="open('picker1')" size="large">点击弹出 DateTime Picker</zui-button>
      <zui-button @click.native="open('picker2')" size="large">点击弹出 Date Picker</zui-button>
      <zui-button @click.native="open('picker3')" size="large">点击弹出 Time Picker</zui-button>
      <zui-button @click.native="open('picker4')" size="large">自定义模板</zui-button>
      <zui-button @click.native="open('picker5')" size="large">设定初始值</zui-button>
    </div>
    <zui-datetime-picker
      ref="picker1"
      v-model="value"
      @confirm="handleChange">
    </zui-datetime-picker>
    <zui-datetime-picker
      ref="picker2"
      type="date"
      v-model="value2"
      @confirm="handleChange">
    </zui-datetime-picker>
    <zui-datetime-picker
      ref="picker3"
      type="time"
      v-model="value3"
      @confirm="handleChange">
    </zui-datetime-picker>
    <zui-datetime-picker
      ref="picker4"
      type="date"
      v-model="value4"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleChange">
    </zui-datetime-picker>
    <zui-datetime-picker
      ref="picker5"
      type="time"
      v-model="value5"
      @confirm="handleChange">
    </zui-datetime-picker>
  </div>
</template>

<style>
.page-datetime-wrapper {
  padding: 20px 0;
}
.page-datetime-wrapper .zui-button:not(last-child) {
  margin-right: 20px;
}
</style>

<script type="text/babel">
  export default {
    data() {
      return {
        value: null,
        value2: null,
        value3: null,
        value4: null,
        value5: '04:32',
        visible: false,
        visible2: false,
        visible3: false,
        visible4: false,
        visible5: false
      };
    },

    methods: {
      open(picker) {
        this.$refs[picker].open();
      },

      handleChange(value) {
        this.$toast({
          message: '已选择 ' + value.toString(),
          position: 'bottom'
        });
      }
    }
  };
</script>
