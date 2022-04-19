<template>
  <div class="select">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="options" v-if="areOptionsVisible || isExpanded">
      <p
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
      default: "",
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
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect);
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
}
.select p {
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
}
.options p:hover {
  background: #e7e7e7;
}
</style>