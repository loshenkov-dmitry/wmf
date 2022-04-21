<template>
  <footer class="footer">
    <div class="container">
      <div class="footer_inner">
        <a href="/" class="logo logo--white">S—Shop</a>
        <nav class="footer-menu">
          <ul class="footer-menu_list">
            <li class="footer-menu_item"><a href="">Copyright</a></li>
            <li class="footer-menu_item"><a href="">Contacts</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  background-color: #1b1b1b;
  color: #fff;
  flex-shrink: 1;
  &_inner {
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.footer-menu_list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 18px;
  line-height: 22px;
}

.footer-menu_item {
  margin-right: 40px;
  &:last-child {
    margin: 0;
  }
}
</style>