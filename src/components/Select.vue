<template>
  <div class="select">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="options" v-if="areOptionsVisible || isExpanded">
      <p
        class="select_item"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: String,
      default: '',
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSelect);
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  cursor: pointer;
  text-align: left;
}
.title {
  padding: 17px 21px 19px 19px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  background: #f5f5f5;
  &:after {
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='9' viewBox='0 0 16 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L8 8L15 1' stroke='black'/%3E%3C/svg%3E%0A");
    content: '';
    width: 14px;
    height: 7px;
  }
}
.select_item {
  margin: 0;
  display: block;
  height: 100%;
  width: 100%;
  border: none;
  background: #f5f5f5;
  font-weight: 500;
  font-size: 18px;
  padding: 17px 21px 19px 19px;
}
.options {
  position: absolute;
  width: 100%;
  border: none;
  background: #f5f5f5;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  box-sizing: border-box;
  margin-top: 0;
  max-height: 300px;
  overflow: auto;
  left: 0;
  width: 100%;
  z-index: 2;
}
.options p:hover {
  background: #e7e7e7;
}
</style>
