import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let cart = localStorage.getItem("cart");

export default new Vuex.Store({
  state: {
    products: [],
    loading: true,
    error: false,
    isCartShown: false,
    cart: cart ? JSON.parse(cart) : [],
  },
  mutations: {


    setProducts: (state, products) => {

      products.forEach((productItem) => {
        let index = state.cart.findIndex(
          (cartItem) => cartItem.id === productItem.id
        );
        if (index !== -1) {
          productItem.inCart = true;
          
        }

      });
      state.products = products;
    },

    setLoading: (state, value) => {
      state.loading = value;
    },

    setError: (state, value) => {
      state.error = value;
    },

    setCart: (state, product) => {
      if (state.cart.length) {
        let index = state.cart.findIndex(
          (cartItem) => cartItem.id === product.id
        );

        if (index === -1) {
          product.inCart = true;
          state.cart.push(product);
        } else {
          state.cart.splice(index, 1);
          product.inCart = false;
        }
      } else {
        product.inCart = true;
        state.cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, product) => {

      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === product.id
      );
      state.cart.splice(index, 1);

      let productItem = state.products.find(
        (cartItem) => cartItem.id === product.id
      );
      productItem.inCart = false;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeAllFromCart: (state) => {
      state.cart = [];
      state.products.forEach((product) => (product.inCart = false));
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    changeCartView: (state) => {
      state.isCartShown = !state.isCartShown
    }
  },
  actions: {
    loadProducts({ commit }) {
      const URL = "http://localhost:3000";
      fetch(`${URL}/products/`)
        .then((res) => res.json())
        .then((data) => {
          commit("setProducts", data);
          commit("setLoading", false);
          return data;
        })
        .catch((e) => {
          console.error(e);
          commit("setLoading", false);
          commit("setError", true);
          return e;
        });
    },

    productToCart({ commit }, product) {
      commit("setCart", product);
    },

    deleteFromCart({ commit }, index) {
      commit("removeFromCart", index);
    },

    deleteAllFromCart({ commit }) {
      commit("removeAllFromCart");
    },

    toggleCartView({commit}) {
      commit('changeCartView')
    }
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
    getCart(state) {
      return state.cart;
    },
    getCartShown(state) {
      return state.isCartShown
      ;
    },
  },
});
