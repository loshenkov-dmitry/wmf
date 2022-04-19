<template>
  <div class="root">
    <Header />
    <div class="shop-body">
      <div class="container">
        <div class="filters">
          <SearchInput :search="searchStr" @search="searchStr = $event" />
          <Select
            :selected="selectedCategory"
            :options="categories"
            @select="sortByCategories"
          />

          <Select
            :selected="selectedSale"
            :options="bestsellers"
            @select="sortBySale"
          />
        </div>

        <h1 class="page-title">Bestsellers:<br />{{ sortedList.length }}</h1>
        <div class="products" v-if="!getLoading && !getError">
          <Product
            v-for="product in sortedList"
            :key="product.id"
            :product="product"
            :isInCart="product.inCart"
            @addToCart="addToCart"
          />
        </div>
        <Loader v-else-if="getLoading && !getError" />
        <div class="error" v-else-if="!getLoading && getError">
          <h3>Ошибка получения данных</h3>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import Product from '@/components/Product';
import Loader from '@/components/Loader';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      categories: [
        { name: 'Sneakers', value: 'Sneakers' },
        { name: 'Other', value: 'Other' },
        { name: 'All', value: '' },
      ],
      bestsellers: [
        { name: 'Bestsellers', value: 'Bestsellers' },
        { name: 'Half Price', value: 'Half Price' },
        { name: 'No Sale', value: '' },
      ],
      selectedCategory: 'Sneakers',
      selectedSale: 'Bestsellers',
      searchStr: '',
      sorted: [],
    };
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    ...mapActions(['loadProducts', 'productToCart']),

    sortByCategories(category) {
      this.sorted = [];
      let vm = this;
      this.filteredList.map((item) => {
        if (item.category === category.name) {
          vm.sorted.push(item);
        }
      });

      this.selectedCategory = category.name;
    },

    sortBySale(saleType) {
      this.sorted = [];
      let vm = this;
      this.filteredList.map((item) => {
        if (item.isSale === saleType.name) {
          vm.sorted.push(item);
        }
      });

      this.selectedSale = saleType.name;
    },

    addToCart(product) {
      this.productToCart(product);
    },
  },

  components: {
    Product,
    Loader,
    SearchInput,
    Select,
    Header,
    Footer,
  },

  computed: {
    ...mapGetters(['getProducts', 'getLoading', 'getError']),

    filteredList() {
      return this.getProducts.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchStr.toLowerCase());
      });
    },

    sortedList() {
      if (this.sorted.length) {
        return this.sorted;
      } else {
        return this.filteredList;
      }
    },
  },
};
</script>

<style lang="scss">
.error {
  text-align: center;
}

.page-title {
  margin: 0 0 -96px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
}

.shop-body {
  flex-grow: 1;
}

.products {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  grid-column-gap: 20px;
  grid-row-gap: 60px;
  margin-bottom: 120px;
}

.filters {
  margin-bottom: 120px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.total {
  position: sticky;
  top: 25px;
}

.btn {
  font-size: 20px;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.2s;
}
</style>
