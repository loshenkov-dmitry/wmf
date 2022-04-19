<template>
  <div class="search">
    <input class="search_input" type="text" v-model="search" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: this.value,
    };
  },
  watch: {
    search(val) {
      this.$emit("search", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.search_input {
  width: 100%;
  border: none;
  background: #f5f5f5;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding: 17px 21px 19px 19px;
}
</style>