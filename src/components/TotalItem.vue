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
.cart-item {
  display: flex;
}
.cart-item_img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  position: relative;
  &::after {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04));
    position: absolute;
    left: 0;
    top: 0;
  }
}

.cart-item_content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cart-item_title {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #818181;
  margin-bottom: 5px;
}

.cart-item_price {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 5px;
  text-align: left;
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
  margin-top: auto;
}
</style>