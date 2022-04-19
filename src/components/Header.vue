<template>
  <header class="header">
    <div class="container">
      <div class="header_inner">
        <a href="/" class="logo header_logo">S—Shop</a>
        <nav class="header_menu">
          <a href="#" class="color-accent">Catalog</a>
        </nav>
        <div class="customer">
          <a href="/" class="header_link">Profile</a>
          <Cart />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Cart from '@/components/Cart';
export default {
  components: {
    Cart,
  },
};
</script>

<style lang="scss">
.header {
  margin-bottom: 80px;

  &_inner {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
    padding: 36px 0;
  }

  &_logo {
    margin-right: 247px;
  }
}
.logo {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
}

.customer {
  display: flex;
  margin-left: auto;
}
</style>
