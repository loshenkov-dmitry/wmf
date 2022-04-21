<template>
  <div class="cart">
    <div class="cart_main">
      <div
        class="cart_title"
        :class="{ 'color-accent': getCartShown }"
        @click="toggleCart"
      >
        Basket <span v-if="getCart.length > 0">({{ getCart.length }})</span>
      </div>

      <Total v-show="getCartShown" :items="getCart" @removeAll="removeAll" />
    </div>
  </div>
</template>

<script>
import Total from '@/components/Total';
import { mapActions, mapGetters } from 'vuex';
export default {
  methods: {
    ...mapActions(['deleteAllFromCart', 'toggleCartView']),

    toggleCart() {
      this.toggleCartView();
    },

    removeAll() {
      this.deleteAllFromCart();
    },
  },

  computed: {
    ...mapGetters(['getCart', 'getCartShown']),
  },

  watch: {
    // getCartShown(newVal) {
    //   if (newVal) document.documentElement.style.overflow = "hidden";
    //   else document.documentElement.style.overflow = "auto";
    // },
  },

  components: {
    Total,
  },
};
</script>

<style lang="scss">
.total {
  position: absolute;
  width: calc(100% + 100px);
  left: 0;
  z-index: 2;
  background: #fff;
  top: 100%;
}

.cart_main {
  z-index: 3;
}

.cart_title {
  user-select: none;
  cursor: pointer;
  margin-left: 43px;
}
</style>
