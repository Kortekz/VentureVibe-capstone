<template>
  <div class="cart">
     <h1>Cart</h1>
     <ul>
       <li v-for="item in cart" :key="item.cartID">
         {{ item.productName }} - Quantity: {{ item.quantity }}
         <button @click="removeItemFromCart(item.cartID)">Remove</button>
       </li>
     </ul>
  </div>
 </template>
 
 <script>
 export default {
  computed: {
     cart() {
       return this.$store.state.cart; // Access cart from Vuex state
     },
  },
  methods: {
     async removeItemFromCart(cartID) {
       try {
         await this.$store.dispatch('removeFromCart', cartID);
       } catch (error) {
         console.error('Error removing item from cart:', error);
       }
     },
  },
  mounted() {
     this.$store.dispatch('getCart'); // Dispatch the getCart action when the component is mounted
  },
 };
 </script>

 <style scoped>
 .cart{
  margin-top: 80px;
 }
 h1{
  color: white;
 }
 </style>
 