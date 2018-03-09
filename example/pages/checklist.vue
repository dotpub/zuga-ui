<template>
  <div class="page-checklist">
    <div class="page-title">Checklist</div>

    <zui-check-list
      class="page-part"
      title=" "
      v-model="value1"
      :options="options1">
    </zui-check-list>

    <div>
      <zui-cell title="">{{ value1 }}</zui-cell>
    </div>

    <zui-check-list
      class="page-part"
      title="  "
      v-model="value2"
      :options="options2">
    </zui-check-list>

    <div>
      <zui-cell title="">{{ value2 }}</zui-cell>
    </div>

    <zui-check-list
      class="page-part"
      title="  "
      :max="2"
      v-model="value3"
      :options="options3">
    </zui-check-list>

    <div>
      <zui-cell title="">{{ value3 }}</zui-cell>
    </div>

    <zui-check-list
      align="right"
      class="page-part"
      title="  "
      v-model="value4"
      :options="options4">
    </zui-check-list>
  </div>
</template>

<script>
  export default {
    name: 'page-checklist',

    data() {
      return {
        value1: [],
        value2: ['B'],
        value3: [' B'],
        value4: []
      };
    },

    created() {
      this.options1 = [' A', ' B', ' C'];
      this.options3 = [' A', ' B', ' C', 'D'];
      this.options4 = [' A', ' B', ' C', 'D'];
      this.options2 = [
        {
          label: ' A',
          value: 'A',
          disabled: true
        },
        {
          label: ' B',
          value: 'B',
          disabled: true
        },
        {
          label: ' C',
          value: 'C'
        },
        {
          label: ' D',
          value: 'D'
        }
      ];
    }
  };
</script>

<style scoped>
.page-checklist .page-part {
  margin-left: 40px;
}
</style>
