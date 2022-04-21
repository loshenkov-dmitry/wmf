<template>
  <div class="product">
    <div class="tag" v-if="product.priceOld">Sale {{ discount }}%</div>
    <div class="product_img">
      <img
        :src="require(`../assets/images/` + product.image)"
        :alt="product.title"
      />
    </div>

    <h3 class="product_title" v-text="product.title"></h3>
    <div class="product_prices">
      <h4 class="product_price product_price--current">${{ product.price }}</h4>
      <h4 class="product_price product_price--old" v-if="product.priceOld">
        ${{ product.priceOld }}
      </h4>
    </div>
    <button
      class="product_btn"
      :class="{ 'product_btn--incart': isInCart }"
      @click="$emit('addToCart', product)"
    >
      {{ isInCart ? 'Added' : 'Add to basket' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    isInCart: Boolean,
  },

  computed: {
    discount: function () {
      return Math.round(
        ((this.product.price - this.product.priceOld) / this.product.priceOld) *
          100
      );
    },
  },
};
</script>

<style lang="scss">
.product {
  display: flex;
  flex-direction: column;
  width: calc(25% - 16px);
  position: relative;

  &:nth-child(3) {
    margin-top: -126px;
    width: calc(50% - 8px);

    img {
      height: 781px;
    }
  }

  img {
    height: 400px;
    object-fit: contain;
  }

  &_img {
    position: relative;
    margin-bottom: 15px;
    &:after {
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.04),
        rgba(0, 0, 0, 0.04)
      );
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  &_title {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin: 0 0 5px;
    color: #000000;
  }
  &_btn {
    text-align: left;
    background: #2e2e2e;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    padding: 17px 21px 19px 19px;
    max-width: 335px;
    border: none;
    cursor: pointer;
    margin-top: auto;
    border: 1px solid #000000;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0.5V8.5M8 16.5V8.5M8 8.5H0H16' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center right 22px;
    &--incart {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='13' viewBox='0 0 16 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 6L6 11L15 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E%0A");
      background-color: transparent;
      color: #2e2e2e;
    }
  }

  &_price {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    margin: 0 10px 0 0;
    color: #000000;
    &:last-of-type {
      margin: 0;
    }
    &--old {
      color: #b7b7b7;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        height: 1px;
        display: block;
        width: 110%;
        left: -5%;
        top: 50%;
        background: #000000;
      }
    }
  }

  &_prices {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
}

.product--wide {
  width: calc(50% - 20px);

  img {
    height: 781px;
  }
}

.tag {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  background-color: var(--accent);
  position: absolute;
  padding: 12px 20px;
  right: 25px;
  top: 25px;
  z-index: 1;
}
</style>
