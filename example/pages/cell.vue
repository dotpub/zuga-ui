<template>
  <div class="page-cell">
    <div class="page-title">Cell</div>
    <zui-cell title=""></zui-cell>
    <zui-cell title="" value="value"></zui-cell>
    <zui-cell title="" icon="more" value="has icon"></zui-cell>
    <zui-cell title="" icon="more">
      <span>image icon</span>
      <img slot="icon" src="../assets/100x100.png" width="24" height="24">
    </zui-cell>
    <zui-cell title="" is-link value="is link"></zui-cell>
    <zui-cell title="" is-link>
      <span style="color: green">this is span</span>
    </zui-cell>
    <zui-cell title="">
      <zui-button size="small" type="primary" icon="back">button</zui-button>
    </zui-cell>

    <zui-cell title="" label="" is-link></zui-cell>

    <zui-cell title="native link" label="link to https://zuga-ui.github.io" is-link to="https://zuga-ui.github.io"></zui-cell>
    <zui-cell title="router link" label="link to /#/toast" is-link :to="{ name: 'Toast' }"></zui-cell>
  </div>
</template>
<script>
export default {

}
</script>
