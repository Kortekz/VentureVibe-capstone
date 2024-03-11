<template>
    <div>
      <nav class="navbar navbar-expand-lg fixed-top mx-auto">
        <!-- Navbar content -->
      </nav>
      <div class="container mt-5">
        <h1 class="text-center mb-4">Explore the world with VentureVibe - Your ultimate travel partner!</h1>
  
        <div class="row">
          <div class="col-md-4" v-for="product in products" :key="product.hubID">
            <div class="card">
              <img :src="product.imageUrl" class="card-img-top" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="card-text">R{{ product.price }}</p>
                <p class="card-text">This is a {{ product.category }}</p>
                <p class="card-text">{{ formatDate(product.date) }}</p>
                <!-- <router-link :to="{ name: 'productDetails', params: { id: product.hubID } }">
                  <button class="btn btn-primary btn-block">View more</button>
                </router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      products() {
        return this.$store.state.products;
      },
    },
    mounted() {
      this.$store.dispatch('getProducts');
    },
    methods: {
      formatDate(date) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
  
  <style scoped>
  h1{
    color: white;
    margin-top: 80px !important;
    margin-bottom: 40px !important;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin: -10px; /* Adjust margin to your preference */
  }
  
  .col-md-4 {
    padding: 10px; /* Adjust padding to your preference */
  }
  
  .card {
    height: 100%;
    border: none;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }
  
  .card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card-title {
    font-size: 20px;
    font-weight: bold;
  }
  
  .card-text {
    font-size: 18px;
    margin-bottom: 10px;
    color: black;
  }
  
  .card-img-top {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    max-width: 100%;
    height: auto;
  }
  
  .btn-primary {
    background-color: rgb(71, 98, 218);
    border: none;
    border-radius: 20px;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: rgb(53, 73, 163);
  }
  </style>
  