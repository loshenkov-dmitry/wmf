<template>
  <div class="cart">
    <div
      class="cart_title"
      :class="{ 'color-accent': cartShown }"
      @click="cartShown = !cartShown"
    >
      Basket <span v-if="getCart.length > 0">({{ getCart.length }})</span>
    </div>
    <div class="total" v-show="cartShown">
      <TotalItems
        v-if="getCart.length > 0"
        :items="getCart"
        @removeAll="removeAll"
      />
      <div v-else>Cart is empty</div>
    </div>
  </div>
</template>

<script>
import TotalItems from "@/components/TotalItems";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      cartShown: false,
    };
  },

  methods: {
    ...mapActions(["deleteAllFromCart"]),

    removeAll() {
      this.deleteAllFromCart();
    },
  },
  computed: {
    ...mapGetters(["getCart"]),
  },
  components: {
    TotalItems,
  },
};
</script>

<style lang="scss" scoped>
.total {
  position: absolute;
  width: 435px;
  z-index: 2;
  background: #fff;
}

.cart {
  position: relative;
}

.cart_title {
  user-select: none;
  cursor: pointer;
}
</style>