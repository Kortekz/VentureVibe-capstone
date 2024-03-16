import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.withCredentials = true;

// const baseURL = 'https://venturevibe-capstone-1.onrender.com'
const baseURL = 'http://localhost:6969'

export default createStore({
  state: {
    products: [],
    users: [],
    cart: [],
    loggedIn: false, // Add a loggedIn state
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
    },
    setLoggedIn(state, status) { 
      state.loggedIn = status
    },
  },
  actions: {
    // CRUD FOR PRODUCTS
    // Get all products
    async getProducts ({ commit }) {
      try {
        let { data } = await axios.get(baseURL + '/getAwayHub')
        console.log(data)
        commit('setProducts', data)

        // let encode = $cookies.get('token')
        // encode = encode.split('.')[1]
        // console.log(JSON.parse(window.atob(encode) ))

      }catch (error) {
        console.error('Error getting products:', error)
      }
    },
    // Delete all products
    async deleteProduct ({ commit }, id) {
      try {
        await axios.delete(baseURL + '/getAwayHub/' + id )
      }catch (error) {
        console.error('Error deleting Product:', error)
      }
      window.location.reload()
    },
    // Update products
    async updateProduct({ commit }, update) {
      try {
        const {data} = await axios.patch(baseURL + '/getAwayHub/' + update.id, update)
        // const { data } = await axios.get(baseURL + '/getAwayHub')
        commit ('setProducts', data)
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
        console.log(data);
      }catch (error) {
        console.error('Error adding Product:', error)
      }
      // window.location.reload()
    },

    // CRUD FOR USERS
    async getUsers({ commit }) {
      try {
        let { data } = await axios.get(baseURL + '/Users')
        commit('setUsers', data)
      }catch (error) {
        console.error('Error getting users:', error)
      }
    },
    // DELETES A USER
    async deleteUser({ commit }, id){
      try {
        await axios.delete(baseURL + '/Users/' + id)
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
      setTimeout(() => {
        // Refresh the page after a short delay
        window.location.reload();
      }, 20); 
    },
    // user Login
    async loginUser({ commit }, user) {
      try {
        let { data } = await axios.post(baseURL + '/login', user)
        console.log(data)
        $cookies.set('token', data.token)
        commit('setLoggedIn', true) // Update loggedIn state
        // alert(data.msg)
      } catch (error) {
        console.error('Cannot log In', error)
      }
    },
    logoutUser({ commit }) {
      // Clear token token and set loggedIn state to false
      this.$cookies.remove('token');
      commit('setLoggedIn', false);
      this.$router.push('/'); // Redirect to home page after logout
      setTimeout(() => {
        // Refresh the page after a short delay
        window.location.reload();
      }, 10);
    },
  },
  async getProfile({ commit }, email) {
    try {
      let { data } = await axios.get(baseURL + '/Users/', { params: { email: email } });
      console.log('User Profile Info', data);
      commit('setUsers', data); 
  
      let encode = $cookies.get('token');
      if (encode) {
        encode = encode.split('.')[1];
        const decodedToken = JSON.parse(window.atob(encode));
        console.log('Decoded Token:', decodedToken);
  
        // Assuming 'setUserToken' mutation sets the decoded token in the store
        commit('setUserToken', decodedToken); 
      } else {
        console.log('Token not found in cookies.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  
  },
  modules: {
  }
})
