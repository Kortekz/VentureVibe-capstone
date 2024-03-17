<template>
    <div>
      <h1>Cart</h1>
      <ul>
        <li v-for="item in cart" :key="item.cartID">
          {{ item.productName }} - Quantity: {{ item.quantity }}
          <button @click="removeFromCart(item.cartID)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        cart: [],
      };
    },
    methods: {
      async getCart() {
        try {
          const { data } = await axios.get(baseURL + '/cart');
          this.cart = data;
        } catch (error) {
          console.error('Error getting cart items:', error);
        }
      },
      async removeFromCart(cartID) {
        try {
          await axios.delete(`${baseURL}/cart/${cartID}`);
          this.cart = this.cart.filter(item => item.cartID !== cartID);
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      },
    },
    mounted() {
      this.getCart();
    },
  };
  </script>
  