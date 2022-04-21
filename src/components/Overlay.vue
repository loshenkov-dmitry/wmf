<template>
  <div class="overlay" @click="$emit('closeOverlay')"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.overlay {
  width: 100vw;
  height: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
}
</style>