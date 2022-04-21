<template>
  <div class="search">
    <div class="search_title">Search</div>
    <div class="search_inner">
      <input class="search_input" type="text" v-model="search" />
      <button
        class="search_btn"
        v-if="search !== ''"
        @click="search = ''"
      ></button>
    </div>
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

  mounted() {
    this.search = "";
  },
};
</script>

<style lang="scss" scoped>
.search_inner {
  position: relative;
}

.search_title {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 20px;
}

.search_input {
  width: 100%;
  border: none;
  background: #f5f5f5;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding: 17px 21px 19px 19px;
}

.search_btn {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6M11 11L6 6M6 6L11 1L1 11' stroke='black'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  background-color: transparent;
}
</style>
