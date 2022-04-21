<template>
  <div class="shop">
    <Header />
    <div class="shop-body">
      <div class="container">
        <div class="filters">
          <SearchInput :search="searchStr" @search="searchProducts" />
          <Select
            :selected="selectedCategory"
            :options="categories"
            :selectName="'Product category'"
            @select="sortByCategories"
          />

          <Select
            :selected="selectedSale"
            :options="inSale"
            :selectName="'Sale'"
            @select="sortBySale"
          />

          <Select
            :selected="selectedPrice"
            :options="priceFilter"
            :selectName="'Sort by price'"
            @select="sortByPrice"
          />

          <!-- <button class="btn">Apply</button> -->
        </div>

        <h1 class="page-title">
          {{ shopTitle }}:<br />{{ sortedList.length }}
        </h1>

        <div class="products" v-if="!getLoading && !getError">
          <div class="products_grid">
            <Product
              v-for="product in sortedList"
              :key="product.id"
              :product="product"
              :isInCart="product.inCart"
              @addToCart="addToCart"
            />
          </div>
        </div>

        <Loader v-else-if="getLoading && !getError" />

        <div class="error" v-else-if="!getLoading && getError">
          <h3>Ошибка получения данных</h3>
        </div>
      </div>
    </div>

    <Overlay v-if="getCartShown" @closeOverlay="closeOverlay" />
    <Footer />
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";
import Product from "@/components/Product";
import Loader from "@/components/Loader";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Overlay from "@/components/Overlay.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      categories: [
        { name: "Sneakers", value: "Sneakers" },
        { name: "Clothes", value: "Clothes" },
        { name: "All", value: "" },
      ],
      inSale: [
        { name: "Sale", value: "Sale" },
        { name: "All", value: "All" },
      ],

      priceFilter: [
        {
          name: "Max Price",
          value: "maxPrice",
        },
        {
          name: "Min Price",
          value: "minPrice",
        },
        {
          name: "Default",
          value: "defaultPriceSort",
        },
      ],
      selectedCategory: "All",
      selectedSale: "All",
      selectedPrice: "Default",
      shopTitle: "Products",
      searchStr: "",
      sorted: [],
      searchActive: false,
    };
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    ...mapActions(["loadProducts", "productToCart", "toggleCartView"]),

    searchProducts(val) {
      this.searchStr = val;
      if (this.searchStr !== "") {
        this.searchActive = true;
      } else {
        this.searchActive = false;
      }
      // this.sorted = [];
      this.sorted = this.getProducts.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchStr.toLowerCase());
      });
      return this.sorted;
    },

    sortByCategories(category) {
      if (!this.searchActive) {
        this.sorted = [];
        this.sorted = this.getProducts.filter((item) => {
          return item.category === category.name;
        });
      } else {
        this.sorted = this.searchProducts(this.searchStr);
        if (category.name === "All") {
          this.selectedCategory = category.name;
          return this.sorted;
        }
        this.sorted = this.sorted.filter((item) => {
          return item.category === category.name;
        });
      }

      this.selectedCategory = category.name;
      this.shopTitle = category.name === "All" ? "Products" : category.name;
    },

    sortBySale(saleType) {
      if (!this.searchActive) {
        this.sorted = [];
        if (saleType.value === "Sale") {
          this.shopTitle = saleType.value;
          this.sorted = this.getProducts.filter((item) => {
            return item.priceOld;
          });
        } else {
          this.sorted = this.getProducts;

          this.shopTitle = "Products";
        }
      } else {
        this.sorted = this.searchProducts(this.searchStr);
        if (saleType.value === "Sale") {
          this.sorted = this.sorted.filter((item) => {
            return item.priceOld;
          });
          this.selectedSale = saleType.name;
        } else {
          this.shopTitle = "Products";
        }
      }
      this.selectedSale = saleType.value;
    },

    sortByPrice(sortType) {
      this.sorted = [];
      if (sortType.value !== "defaultPriceSort") {
        this.sorted = this.getProducts.sort((a, b) => {
          return a.price - b.price;
        });

        if (sortType.value === "maxPrice") {
          this.sorted.reverse();
        }
      } else {
        this.sorted = this.getProducts.sort((a, b) => {
          return a.id - b.id;
        });
      }

      this.selectedPrice = sortType.name;
    },

    addToCart(product) {
      this.productToCart(product);
    },

    closeOverlay() {
      this.toggleCartView();
    },
  },

  components: {
    Product,
    Loader,
    SearchInput,
    Select,
    Header,
    Footer,
    Overlay,
  },

  computed: {
    ...mapGetters(["getProducts", "getLoading", "getError", "getCartShown"]),

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
        return this.getProducts;
      }
    },
  },
};
</script>

<style lang="scss">
.shop {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.shop-body {
  flex-grow: 1;
}

.error {
  text-align: center;
}

.page-title {
  margin: 0 0 30px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
}

.products_grid {
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

.btn {
  border-radius: 0;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;
  background: #2e2e2e;
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding: 17px 21px 19px 19px;
  max-width: 335px;
  margin-top: auto;
  border: 1px solid #000000;
}
</style>
