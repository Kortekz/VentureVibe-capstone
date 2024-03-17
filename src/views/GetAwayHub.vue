<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top mx-auto">
      <!-- Navbar content -->
    </nav>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Explore the world with VentureVibe - Your ultimate travel partner!</h1>

      <div v-if="products.length > 0">
        <!-- Search, Sort, and Category Section -->
        <div class="search-sort-container">
          <input v-model="searchTerm" type="text" placeholder="Search Products" class="search-input">
          <button class="category-btn" @click="toggleCategory">{{ category }}</button>
          <button class="sort-btn" @click="sortProducts">Sort</button>
        </div>

        <div class="row">
          <div class="col-md-4" v-for="product in filteredProducts" :key="product.hubID">
            <div class="card">
              <img :src="product.imageUrl" class="card-img-top" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="card-text">This is a {{ product.category }}</p>
                <p class="card-text">{{ formatDate(product.date) }}</p>
                <p class="price">R{{ product.price }}</p>

                <router-link :to="{ name: 'hubDetails', params: { id: product.hubID } }" class="btn1">
                  View more
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <spinnerComponent></spinnerComponent>
      </div>
    </div>
  </div>
</template>

<script>
import spinnerComponent from '../components/spinnerComp.vue';

export default {
  components: {
    spinnerComponent,
  },
  data() {
    return {
      searchTerm: '',
      categories: ['All Products', 'Event', 'Vacation'],
      currentCategoryIndex: 0,
      shouldSort: false,
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    filteredProducts() {
      let filtered = this.products;

      // Search filter
      if (this.searchTerm.trim() !== '') {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(term)
        );
      }

      // Category filter
      if (this.categories[this.currentCategoryIndex] !== 'All Products') {
        filtered = filtered.filter(product =>
          product.category === this.categories[this.currentCategoryIndex]
        );
      }

      // Sort filter
      if (this.shouldSort) {
        filtered.sort((a, b) => a.price - b.price);
      }

      return filtered;
    },
    category() {
      return this.categories[this.currentCategoryIndex];
    },
  },
  mounted() {
    this.$store.dispatch('getProducts')
      .then(() => {
        // Handle successful fetch
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    toggleCategory() {
      this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
    },
    sortProducts() {
      this.shouldSort = !this.shouldSort;
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
  margin-top: 100px !important;
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

.search-input {
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 18px;
}

.category-btn, .sort-btn {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.category-btn:hover, .sort-btn:hover {
  background-color: #f0f0f0;
}

.btn1 {
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 40px;
  color: white;
  width: 70%;
  margin-bottom: 10px;
  font-size: 18px;
  padding: 15px;
  transition: color 0.3s, transform 0.3s;
  text-decoration: none;
}

.btn1:hover {
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
}

.search-sort-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.search-sort-container input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 20%;
}

.search-sort-container button {
  background-color: rgb(71, 98, 218);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 10px 20px; /* Adjust padding as needed */
  font-size: 18px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.search-sort-container button:hover {
  background-color: rgb(43, 60, 138);
  color: rgb(255, 255, 255);
}

.Prod1, .Sort {
  width: auto;
  margin: 0;
  padding: 10px; 
}

/* Media Queries for 720px screens */
@media screen and (max-width: 720px) {
  .container {
    width: 85%; 
    margin-top: 80px; 
    margin-bottom: 30px; 
  }

  h1 {
    margin-top: 80px !important; 
    margin-bottom: 30px !important; 
    font-size: 28px; 
  }

  .col-md-4 {
    width: 100%; 
    padding: 10px; 
  }

  .card-title {
    font-size: 18px; 
  }

  .card-text {
    font-size: 16px; 
  }

  .search-sort-container {
    flex-direction: column; 
    align-items: center; 
  }

  .search-input {
    width: 280px !important; 
    margin-bottom: 10px; 
    margin-left: 10px; 
  }

  .category-btn,
  .sort-btn {
    width: 280px !important; 
    margin: 10px !important; 
  }

  .btn1 {
    font-size: 16px; 
    padding: 12px; 
  }
}

/* Media Queries for 300px screens */
@media screen and (max-width: 300px) {
  .container {
    width: 90%; 
    margin-top: 60px; 
    margin-bottom: 20px; 
  }

  h1 {
    margin-top: 60px !important; 
    margin-bottom: 20px !important; 
    font-size: 24px; 
  }

  .card-title {
    font-size: 16px; 
  }

  .card-text {
    font-size: 14px; 
  }

  .search-input {
    width: 100%; 
  }

  .category-btn,
  .sort-btn {
    padding: 6px 12px; 
  }

  .btn1 {
    font-size: 14px; 
    padding: 10px; 
  }
  .search-sort-container {
    flex-direction: column; 
    align-items: center; 
  }

  .search-input {
    width: 200px !important; 
    margin-bottom: 10px; 
    margin-left: 10px; 
  }

  .category-btn,
  .sort-btn {
    width: 200px !important; 
    margin: 10px !important; 
  }
}


</style>
