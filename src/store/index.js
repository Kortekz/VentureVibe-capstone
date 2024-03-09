import { createStore } from 'vuex'
import axios from 'axios'

const baseURL = 'https://venturevibe-capstone-1.onrender.com'

export default createStore({
  state: {
    products: [],
    users: []
  },
  getters: {
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setUsers(state, users) {
      state.users = users
    }
  },
  actions: {
    // CRUD FOR PRODUCTS
    // Get all products
    async getProducts ({ commit }) {
      try {
        let { data } = await axios.get(baseURL + '/getAwayHub')
        commit('setProducts', data.results)
      }catch (error) {
        console.error('Error getting products:', error)
      }
    },
    // Delete all products
    async deleteProduct ({ commit }, id) {
      try {
        await axios.delete(baseURL + '/getAwayHub' + id )
      }catch (error) {
        console.error('Error deleting Product:', error)
      }
    },
    // Update products
    async updateProduct({ commit }, update) {
      try {
        await axios.patch(baseURL + '/getAwayHub' + update.id, update)
        const { data } = await axios.get(baseURL + '/getAwayHub')
      }catch(error) {
        console.error('Error updating Product:', error)
      }
    }
  },
  modules: {
  }
})
