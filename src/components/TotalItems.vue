<template>
  <div class="total_inner">
    <div class="total_header">
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
        <div class="total-table-item" v-if="items.length > 0">
          <div class="total-table-item_name">Content:</div>
          <button class="total_remove-all" @click="$emit('removeAll')">
            Remove all
          </button>
        </div>
      </div>
    </div>

    <div class="total_sum">
      <span class="total_sum-title">Order Total:</span>${{ totalSum }}
    </div>

    <div class="total-items" v-if="items.length > 0">
      <TotalItem
        v-for="item in items"
        :key="item.id"
        :product="item"
        @removeFromCart="deleteFromCart"
      ></TotalItem>
    </div>
    <button class="total_checkout" :disabled="items.length === 0">
      {{ items.length === 0 ? "Your cart is empty" : "Checkout" }}
    </button>
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
.total_inner {
  border-top: 1px solid #bdbdbd;
  padding-top: 20px;
}

.total_header {
  padding: 20px 100px 40px 40px;
}
.total-items {
  display: grid;
  grid-gap: 40px;
  padding: 40px;
  margin-bottom: 15px;
}

.total_title {
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  color: #000000;
  margin: 0 0 30px;
}

.total-table-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  &:last-child {
    margin: 0;
  }
}

.total-table-item_name {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}

.total-table-item_value {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.cart_overlay {
  z-index: 1;
}

.total_sum {
  padding: 20px 100px 20px 40px;
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
}

.total_remove-all {
  padding: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  text-decoration-line: underline;
  color: #000000;
  background: transparent;
  border: none;
  cursor: pointer;
}

.total_checkout {
  width: 100%;
  border: none;
  background: #000;
  color: #fff;
  text-align: left;
  padding: 30px 40px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>