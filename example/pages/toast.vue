<template>
  <div class="page-toast">
    <h1 class="page-title">Toast</h1>
    <div class="page-toast-wrapper">
      <zui-button @click.native="openToast" size="large">alert Toast</zui-button>
      <zui-button @click.native="openToastWithIcon" size="large">alert icon Toast</zui-button>
      <zui-button @click.native="openBottomToast" size="large">custom position Toast</zui-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    openToast() {
      this.$toast('  ');
    },

    openToastWithIcon() {
      this.$toast({
        message: '  ',
        iconClass: 'zugaui zugaui-success'
      });
    },

    openBottomToast() {
      this.$toast({
        message: '  ',
        position: 'bottom'
      });
    }
  }
}
</script>
<style scoped>
.page-toast-wrapper {
  padding: 20px 0;
  left: 50%;
  position: absolute;
  height: 100%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.page-toast-wrapper .zui-button {
  margin-right: 20px;
}
</style>
