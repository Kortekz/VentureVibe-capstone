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
                <p class="card-text">This is a {{ product.category }}</p>
                <p class="card-text">{{ formatDate(product.date) }}</p>
                <p class="price">R{{ product.price }}</p>
                <!-- <router-link :to="{ name: 'productDetails', params: { id: product.hubID } }">
                </router-link> -->
                <button class="btn1">View more</button>
                <!-- <button class="btn2">Book Now</button> -->
                
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
    margin: -10px;
  }
  
  .col-md-4 {
    padding: 20px; 
  }
  
  .card {
    height: 100%;
    /* width: 85%; */
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
  align-items: center; 
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
  .price {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: black;
  }
  
  .card-img-top {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    max-width: 100%;
    height: 300px;
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
  .btn1{
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 40px;
  color:white;
  width: 70%;
  margin-bottom: 10px;
  /* margin-left:10px; */
  font-size: 18px;
  padding: 15px;
  transition: color 0.3s, transform 0.3s;
}
.btn2{
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 40px;
  color:white;
  width: 70%;
  /* margin-left:10px; */
  font-size: 18px;
  padding: 15px;
  transition: color 0.3s, transform 0.3s;
}
.btn1:hover{
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
}
.btn2:hover{
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
}
  </style>
  