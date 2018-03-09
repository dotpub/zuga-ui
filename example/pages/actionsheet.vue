<template>
  <div class="page-actionsheet">
    <h1 class="page-title">Action Sheet</h1>
    <div class="page-actionsheet-wrapper">
      <zui-button @click.native="sheetVisible = true" size="large">action sheet</zui-button>
      <zui-button @click.native="sheetVisible2 = true" size="large">action sheet 2</zui-button>
    </div>
    <zui-action-sheet :actions="actions" v-model="sheetVisible" cancel-text=""></zui-action-sheet>
    <zui-action-sheet :actions="actions2" v-model="sheetVisible2" cancel-text=""></zui-action-sheet>
  </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        sheetVisible: false,
        sheetVisible2: false,
        actions: [],
        actions2: []
      };
    },

    methods: {
      takePhoto() {
        console.log('taking photo');
      },
      openAlbum() {
        console.log('opening album');
      }
    },

    mounted() {
      this.actions = [{
        name: '',
        method: this.takePhoto
      }, {
        name: '  ',
        method: this.openAlbum
      }];
      this.actions2 = [{
        name: ''
      }, {
        name: ''
      }];
    }
  };
</script>
<style scoped>
.page-actionsheet-wrapper {
  padding: 20px 0;
  left: 50%;
  position: absolute;
  height: 100%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.page-actionsheet-wrapper .zui-button:first-child {
  margin-right: 20px;
}
</style>
