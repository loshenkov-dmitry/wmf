<template>
  <header class="header">
    <div class="container">
      <div class="header_inner">
        <div class="header_main">
          <a href="/" class="logo header_logo">S—Shop</a>
          <nav class="header_menu">
            <a href="#" class="color-accent">Catalog</a>
          </nav>
        </div>
        <div class="customer">
          <a href="/" class="customer_link">Profile</a>
          <Cart />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Cart from "@/components/Cart";
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
  }

  &_logo {
    margin-right: 247px;
  }

  &_main {
    padding: 36px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  padding: 41px 0;
  width: 455px;
  display: flex;
  margin-left: auto;
  position: relative;
  justify-content: flex-end;
  z-index: 3;
  background: #fff;
}
</style>
