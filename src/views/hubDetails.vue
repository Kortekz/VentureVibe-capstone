<template>
    <div class="hub-details">
      <h2 class="static-heading">Product Details</h2>
      <div v-if="product" class="row align-items-center justify-content-center">
        <div class="col-md-4 image-container">
          <img :src="product.imageUrl" class="img-fluid" alt="Product Image">
        </div>
        <div class="col-md-4 content">
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="desc">{{ product.description }}</p>
          <!-- <p class="product-info">{{ product.category }}</p> -->
          <p class="card-text">Available: {{ formatDate(product.date) }}</p>
          <p class="money">Book this 
            {{ product.category }}
            for the Low price of R{{ product.price }} !
        </p>

        <div class="quantity-input">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" v-model="quantity" min="1" max="10">
        </div>

          <router-link to="/getAwayHub">
            <button class="btn btn-primary">Back</button>
          </router-link>
          <button @click="bookNow" class="btn btn-primary">Book Now</button>
        </div>
      </div>
      <div v-else>
        <spinnerComponent></spinnerComponent>
      </div>
    </div>
  </template>
  
  <script>
  import spinnerComponent from '../components/spinnerComp.vue';
  
  export default {
    data() {
    return {
      quantity: 1, // Default quantity is 1
    };
  },
    components: {
      spinnerComponent
    },
    computed: {
      product() {
        const productId = this.$route.params.id;
        if (!productId) {
          this.$router.push({ name: 'home' });
          return null;
        }
        return this.$store.state.products.find(product => product.hubID == productId);
      }
    },
    methods: {
      bookNow() {
      const newItem = {
        productID: this.product.hubID,
        quantity: this.quantity,
      };
      this.$store.dispatch('addToCart', newItem);
    },
      formatDate(date) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
    mounted() {
      this.$store.dispatch('getProducts', this.$route.params);
    }
  }
  </script>
  
  <style scoped>
  .hub-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    padding-bottom: 50px;
    margin-top: 100px;
    margin-left: 110px;
    margin-bottom: 50px;
    width: 85%;
  }
  
  .static-heading {
    font-size: 35px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 20px; 
    display: inline-block;
    background-color: rgb(71, 98, 218);
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .product-title {
    font-size: 30px;
    color: black;
    margin-bottom: 10px; 
  }
  
  .desc {
    font-size: 18px;
    color: black;
    margin-bottom: 20px; 
  }
  
  .product-info {
    font-size: 1.5rem;
    color: black;
    margin-bottom: 10px; 
  }
  
  .card-text {
    font-size: 18px;
    color: black;
    margin-bottom: 10px; 
  }
  
  .money {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  .img-fluid {
    border-radius: 20px;
    height: 400px;
    width: 130%; 
    max-width: 1000px;
  }
  
  .image-container {
    margin-right: 160px; 
  }
  
  .btn-primary {
    background-color: rgb(71, 98, 218);
    color: #ffffff;
    border: none;
    padding: 15px;
    font-size: 20px;
    margin: 10px;
  }
  
  .btn-primary:hover {
    background-color: rgb(36, 49, 107);
  }
  
  .content {
    margin-left: 20px;
  }
  
/* Media Queries for 720px screens */
@media screen and (max-width: 720px) {
  .hub-details {
    margin-left: 25px; 
    margin-top: 50px; 
    width: 85%;
  }

  .static-heading {
    font-size: 28px; 
  }

  .product-title {
    font-size: 24px; 
  }

  .desc {
    font-size: 16px; 
  }

  .money {
    font-size: 18px; 
  }

  .img-fluid {
    height: 300px; 
    width: 100%; 
    max-width: none; 
  }

  .image-container {
    margin-right: 0; 
  }

  .btn-primary {
    font-size: 18px; 
    padding: 10px; 
    margin: 5px; 
  }
}

/* Media Queries for 300px screens */
@media screen and (max-width: 320px) {
  .hub-details {
    margin-left: 22px; 
    margin-top: 85px; 
    width: 85%
  }

  .static-heading {
    font-size: 24px; 
  }

  .product-title {
    font-size: 20px; 
    margin-top: 25px;
  }

  .desc {
    font-size: 14px; 
  }

  .money {
    font-size: 16px; 
  }

  .img-fluid {
    height: 200px; 
  }

  .btn-primary {
    font-size: 16px; 
    padding: 8px; 
    margin: 3px;
    margin-top: 25px; 
  }
}
  </style>
  