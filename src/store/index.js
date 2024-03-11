import { createStore } from 'vuex'
import axios from 'axios'

const baseURL = 'https://venturevibe-capstone-1.onrender.com'

export default createStore({
  state: {
    products: [],
    users: [],
    cart: []
  },
  getters: {
  },
  mutations: {
    setProducts(state, data) {
      state.products = data
    },
    setUsers(state, users) {
      state.users = users
    },
    setCart(state, cart) {
      state.cart = cart
    }
  },
  actions: {
    // CRUD FOR PRODUCTS
    // Get all products
    async getProducts ({ commit }) {
      try {
        let { data } = await axios.get(baseURL + '/getAwayHub')
        console.log(data)
        commit('setProducts', data)
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
      // window.location.reload()
    },
    // adding products CRUD
    async addProduct({ commit }, newProduct) {
      try {
        let {data} = await axios.post(baseURL + '/getAwayHub', newProduct)
        commit ('setProducts', data)
      }catch (error) {
        console.error('Error adding Product:', error)
      }
      window.location.reload()
    },

    // CRUD FOR USERS
    async getUsers({ commit }) {
      try {
        let { data } = await axios.get(baseURL + '/Users')
        commit('setUsers', data.results)
      }catch (error) {
        console.error('Error getting users:', error)
      }
    },
    // DELETES A USER
    async deleteUser({ commit }, id){
      try {
        await axios.delete(baseURL + '/Users' + id)
      }catch (error) {
        console.error('Error deleting User:', error)
      }
      window.location.reload()
    },
    // UPDATES A USER
    async updateUser({commit, state}, update){
      try{
        await axios.patch(baseURL + '/Users' + update.userID ,update)
        const { data } = await axios.get(baseURL + '/Users')
      }catch(error){
        console.error('Error updating Users:', error)
      }
    },
    // ADDS A USER
    async addUser({ commit }, newUser) {
      try {
        let {data} = await axios.post(baseURL + '/Users', newUser)
        commit('setUsers', data)
      }catch(error) {
        console.error('Error adding User:', error)
      }
      window.location.reload()
    }
  },
  modules: {
  }
})
