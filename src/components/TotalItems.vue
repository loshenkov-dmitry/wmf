<template>
  <div class="total_body">
    <h4 class="total_title">Total</h4>
    <div class="total-table">
      <div class="total-table-item">
        <div class="total-table-item_name">Subtotal:</div>
        <div class="total-table-item_value">
          {{ (totalSum - totalDiscount).toFixed(2) }}
        </div>
      </div>
      <div class="total-table-item" v-if="totalDiscount > 0">
        <div class="total-table-item_name">Sale:</div>
        <div class="total-table-item_value">{{ totalDiscount }}</div>
      </div>
      <div class="total-table-item">
        <div class="total-table-item_name">Content:</div>
        <button class="total_remove-all" @click="$emit('removeAll')">
          Remove all
        </button>
      </div>
    </div>
    <div class="total_sum">${{ totalSum }}</div>

    <div class="total-items">
      <TotalItem
        v-for="item in items"
        :key="item.id"
        :product="item"
        @removeFromCart="deleteFromCart"
      ></TotalItem>
    </div>
    <button class="total_checkout">Checkout</button>
  </div>
</template>

<script>
import TotalItem from "@/components/TotalItem";
import { mapActions } from "vuex";
export default {
  props: {
    items: Array,
  },

  methods: {
    ...mapActions(["deleteFromCart"]),
  },

  computed: {
    totalSum: function () {
      let sum = [];

      for (let item of this.items) {
        sum.push(item.price);
      }

      sum = sum.reduce((sum, item) => {
        return sum + item;
      }, 0);

      return sum.toFixed(2);
    },

    totalDiscount: function () {
      let discount = [];

      for (let item of this.items) {
        if (item.priceOld) {
          discount.push(item.priceOld - item.price);
        }
      }

      discount = discount.reduce((discount, item) => {
        return discount + item;
      }, 0);

      return discount.toFixed(2);
    },
  },
  components: {
    TotalItem,
  },
};
</script>

<style lang="scss">
.total-items {
  display: grid;
  grid-gap: 10px;
  margin-bottom: 15px;
}

.total-item {
  text-align: left;
}
</style>