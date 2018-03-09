<template>
  <div class="page-button">
    <h1 class="page-title">Button</h1>
    <div class="page-button-group">
      <zui-button size="large">default</zui-button>
      <zui-button size="large" type="primary">primary</zui-button>
      <zui-button size="large" type="danger">danger</zui-button>
    </div>

    <div class="page-button-group">
      <zui-button>default</zui-button>
      <zui-button type="primary">primary</zui-button>
      <zui-button type="danger">danger</zui-button>
    </div>

    <div class="page-button-group">
      <zui-button size="small">default</zui-button>
      <zui-button size="small" type="primary">primary</zui-button>
      <zui-button size="small" type="danger">danger</zui-button>
    </div>

    <div class="page-button-group">
      <zui-button disabled size="large">default</zui-button>
      <zui-button disabled size="large" type="primary">primary</zui-button>
      <zui-button disabled size="large" type="danger">danger</zui-button>
    </div>

    <div class="page-button-group">
      <zui-button plain size="large">default</zui-button>
      <zui-button plain size="large" type="primary">primary</zui-button>
      <zui-button plain size="large" type="danger">danger</zui-button>
    </div>

    <div class="page-button-group">
      <zui-button>
        <img src="../assets/100x100.png" height="20" width="20" slot="icon">
        icon button
      </zui-button>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.page-button {
  padding: 15px 0 15px;
}
.page-button-group, .page-button-group>* {
  margin-right: 15px;
}
</style>
