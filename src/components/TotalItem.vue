<template>
  <div class="cart-item">
    <div class="cart-item_img">
      <img
        :src="require(`../assets/images/` + product.image)"
        :alt="product.title"
      />
    </div>
    <div class="cart-item_content">
      <div class="cart-item_title">{{ product.title }}</div>
      <div class="cart-item_price">${{ product.price }}</div>
      <button class="cart-item_btn" @click="$emit('removeFromCart', product)">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style lang="scss" scoped>
.cart-item_img {
  width: 100px;
  height: 100px;
}

.cart-item_title {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #818181;
}

.cart-item_price {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.cart-item_btn {
  cursor: pointer;
  background: transparent;
  padding: 0;
  border: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: underline;
}
</style>