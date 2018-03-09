<template>
  <div>
    <div class="page-title">Zuga UI</div>
    <div>
      <zui-cell title="Toast" is-link @click.native="go('/toast')"></zui-cell>
      <zui-cell title="Button " is-link @click.native="go('/button')" ></zui-cell>
      <zui-cell title="Cell" is-link @click.native="go('/cell')" ></zui-cell>
      <zui-cell title="Check List" is-link @click.native="go('/checklist')" ></zui-cell>
      <zui-cell title="Action Sheet" is-link @click.native="go('/actionsheet')" ></zui-cell>
      <zui-cell title="Datetime Picker" is-link @click.native="go('/datetime-picker')" ></zui-cell>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    go(uri) {
      this.$router.push(uri);
    }
  }
}
</script>
<style scoped>
</style>
