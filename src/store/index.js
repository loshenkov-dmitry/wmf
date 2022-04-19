import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    loading: true,
    error: false,
    cart: []
  },
  mutations: {
    initialiseStorage (state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.cart)
        state.products.forEach((item) => {
          if (state.cart.includes(item)) {
            item.inCart = true
          }
        })

      }
    },
    setProducts: (state, products) => {
      state.products = products
    },

    setLoading: (state, value) => {
      state.loading = value
    },

    setError: (state, value) => {
      state.error = value
    },

    setCart: (state, product) => {
      if (state.cart.length) {
        let index = state.cart.indexOf(product)
        if (index === -1) {
          product.inCart = true
          state.cart.push(product)

        } else {
          product.inCart = false
          state.cart.splice(index, 1)

        }
      } else {
        product.inCart = true
        state.cart.push(product)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    removeFromCart: (state, product) => {
      let index = state.cart.indexOf(product)
      product.inCart = false
      state.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    removeAllFromCart: state => {
      state.cart = []
      state.products.forEach(product => (product.inCart = false))
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  actions: {
    loadProducts ({ commit }) {
      const URL = 'http://localhost:3000'
      fetch(`${URL}/products/`)
        .then(res => res.json())
        .then(data => {
          commit('setProducts', data)
          commit('initialiseStorage')
          commit('setLoading', false)
          return data
        })
        .catch(e => {
          console.error(e)
          commit('setLoading', false)
          commit('setError', true)
          return e
        })
    },

    productToCart ({ commit }, product) {
      commit('setCart', product)
    },

    deleteFromCart ({ commit }, index) {
      commit('removeFromCart', index)
    },

    deleteAllFromCart ({ commit }) {
      commit('removeAllFromCart')
    }
  },
  getters: {
    getProducts (state) {
      return state.products
    },
    getLoading (state) {
      return state.loading
    },
    getError (state) {
      return state.error
    },
    getCart (state) {
      return state.cart
    }
  }
})
