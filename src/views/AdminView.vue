<template>
    <div>
      <div class="container mt-5">
        <h1 class="text-center mb-4">Admin Dashboard</h1>
        <h2 class="text-center mb-4">Products</h2>
  
        <!-- Add Product Modal -->
        <button type="button" class="btn btn-success mb-2" data-toggle="modal" data-target="#addProductModal">
          Add Product
        </button>
  
        <!-- Product Table -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in $store.state.products" :key="product.hubID">
              <td>{{ product.hubID }}</td>
              <td><img :src="product.imageUrl" alt="Product Image" ></td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.category }}</td>
              <td>{{ formatDate(product.date) }}</td>
              <td>
                <button class="btn btn-warning" @click="editProduct(product)" data-toggle="modal" data-target="#editProductModal">
                  Edit
                </button>
                <button class="btn btn-danger" @click="deleteProduct(product.hubID)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
  <!-- Add Product Modal -->
  <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
          </div>

          <div class="modal-body">
            <!-- Form for adding a new product -->
            <form @submit.prevent="addProduct">
              <div class="form-group">
                <label class="add" for="productName">Name:</label>
                <input type="text" class="form-control" id="productName" v-model="name" required>
              </div>
              <div class="form-group">
                <label class="add" for="Image">Image:</label>
                <input type="text" class="form-control" id="productImage" v-model="imageUrl" required>
              </div>
              <div class="form-group">
                <label class="add" for="productDescription">Description:</label>
                <textarea class="form-control" id="productDescription" v-model="description" required></textarea>
              </div>
              <div class="form-group">
                <label class="add" for="productPrice">Price:</label>
                <input type="number" class="form-control" id="productPrice" v-model="price" required>
              </div>
              <div class="form-group">
                <label class="add" for="productCategory">Category:</label>
                <select class="form-control" id="productCategory" v-model="category" required>
                  <option value="Event">Event</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </div>
              <div class="form-group">
                <label class="add" for="productDate">Date:</label>
                <input type="date" class="form-control" id="productDate" v-model="date" required>
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary mr-2" @click="addProduct">Add Product</button>
            </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>

    <!-- EDIT PRODUCT MODAL -->
    <div class="modal fade" id="editProductModal" tabindex="-1" role="dialog" aria-labelledby="editProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered1" role="document">
        <div class="modal-content edit-modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductModalLabel">Edit Product</h5>
          </div>
          <div class="modal-body">
            <!-- Form for editing an existing product -->
            <form @submit.prevent="updateProduct">
              <div class="form-group">
                <label class="add" for="productName">Name:</label>
                <input type="text" class="form-control" id="productName" v-model="selectedProduct.name" required>
              </div>
              <div class="form-group">
                <label class="add" for="Image">Image:</label>
                <input type="text" class="form-control" id="productImage" v-model="selectedProduct.imageUrl" required>
              </div>
              <div class="form-group">
                <label class="add" for="productDescription">Description:</label>
                <textarea class="form-control" id="productDescription" v-model="selectedProduct.description" required></textarea>
              </div>
              <div class="form-group">
                <label class="add" for="productPrice">Price:</label>
                <input type="number" class="form-control" id="productPrice" v-model="selectedProduct.price" required>
              </div>
              <div class="form-group">
                <label class="add" for="productCategory">Category:</label>
                <select class="form-control" id="productCategory" v-model="selectedProduct.category" required>
                  <option value="Event">Event</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </div>
              <div class="form-group">
                <label class="add" for="productDate">Date:</label>
                <input type="date" class="form-control" id="productDate" v-model="selectedProduct.date" required>
              </div>
              <div class="form-group">
              <button type="button" class="btn btn-secondary" @click="closeEditModal">Close</button>
              <button type="submit" class="btn btn-primary mr-2" @click="updateProduct">Update</button>
            </div>

            </form>
          </div>
        </div>
      </div>
    </div>


    <!-- USER TABLE -->
    <!-- Users Table -->
    <div class="container mt-5">
      <h2 class="text-center mb-4">Users</h2>
      <table class="table">
        <!-- Table Headers -->
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr v-for="user in getUsers" :key="user.userID">
            <!-- User Data -->
            <td>{{ user.userID }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.userRole }}</td>
            <td>
              <button class="btn btn-danger" @click="deleteUser(user.userID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

</div>
</template>
  
<script>

import Swal from 'sweetalert2';

export default {
data() {
  return {
    name: '',
    imageUrl: '',
    description: '',
    price: '',
    category: '',
    date: '',
    selectedProduct: {},
    // USERS
    firstName: '',
    lastName: '',
    email: '',
    userRole: '',
  }
},
computed: {
  // this gets all products
  getProducts() {
    return this.$store.state.products;
  },
  getUsers() {
      return this.$store.state.users;
    },
  addProduct() {
    this.$store.dispatch('addProduct', this.$data)
    // After adding the product, close the modal
    $('#addProductModal').modal('hide');
      },
    },
mounted() {
  this.$store.dispatch('getProducts');
  this.$store.dispatch('getUsers');
},
methods: {
//   editProduct(id) {
//   let edit = {
//     hubID:hubID,
//     name: this.name,
//     imageUrl: this.imageUrl,
//     description: this.description,
//     price: this.price,
//     category: this.category,
//     date: this.date
//   }
//   this.$store.dispatch('editProduct', edit)
// },
  deleteProduct(productId) {
    this.$store.dispatch('deleteProduct', productId);
    
  },
  formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
},
  updateFormattedDate() {
  const inputDate = new Date(this.date);
  const formattedDate = inputDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});
  this.date = formattedDate;
},
  editProduct(product) {
    // Set the selectedProduct to the details of the product being edited
    this.selectedProduct = { ...product}
    // Open the edit product modal
    $('#editProductModal').modal('show');
    },

    updateProduct() {
  // Handle the update product functionality
  this.$store.dispatch('updateProduct', this.selectedProduct).then(() => {
    Swal.fire('Product Updated!', 'The Product has been updated.', 'success');
    // Close the modal after updating
    $('#editProductModal').modal('hide');
  }).catch((error) => {
    console.error('Error updating product:', error);
    Swal.fire('Error', 'There was an error updating the Product. Please try again.', 'error');
  });
},
  deleteUser(userId) {
      this.$store.dispatch('deleteUser', userId);
    }
}
};
</script>
  
<style scoped>
h1{
  color: white;
  margin-top: 80px;
}
h2{
  color: white;
}

.container {
  /* margin-top: 100px; */
  padding-top: 20px;
  padding-bottom: 20px; 
}
.btn-success {
  background-color: rgb(71, 98, 218);
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 18px;
  padding: 15px;
}
.btn-success:hover {
  background-color: rgb(53, 73, 163);
}
.table {
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden; 
}
.table th{
  font-size: 20px;
  text-align: center;
}
.table td{
  font-size: 18px;
  color: black;
  text-align: center;
}
.table th {
  background-color: rgb(71, 98, 218);
  color: white;
  padding: 20px;
}
.table tbody tr:hover {
  background-color: rgba(71, 98, 218, 0.1);
}
img{
  height: 150px;
  width: 200px;
}
.modal-content {
  border-radius: 20px;
}
.modal-header{
  background-color: rgb(71, 98, 218);
}
.modal-title {
  color: rgb(255, 255, 255);
}
.modal-footer {
  border-top: none;
}

.btn-warning,
.btn-danger {
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: white;
}
.btn-warning {
  background-color: #c3c300; 
  border-color: #c3c300;
}
button{
  width: 150px;
  margin: 8px;
}
.btn-danger {
  background-color: #dc3545; 
  border-color: #dc3545;
}
.btn-danger:hover {
  background-color: #81000d; 
  border-color: #81000d; 
}
.btn-warning:hover{
  background-color: #848401; 
  border-color: #848401;
}

/* ADD PRODUCT MODAL STYLES */
.btn-primary{
  font-size: 18px;
}
.btn-secondary{
  font-size: 18px;
}
.add {
  font-size: 18px;
  text-align: left;
  color: black;
}

/* Center modal on the screen */
.modal-dialog-centered {
  display: flex;
  align-items: center;
  min-height: calc(70% - 3.5rem);
}
.modal-dialog-centered1 {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.modal-content {
  /* border-radius: 50px;  */
  max-width: 400px; 
  margin: 0 auto; 
}
.modal-body {
  text-align: center;
  padding: 30px;
}
.form-group {
  text-align: left;
}
.form-control {
  color: black;
  font-size: 16px;
  border: 1px solid black;
  flex: 1;
  width: 100%; 
  border-radius: 10px;
  margin-bottom: 15px;
}

/* Adjust modal styles for responsiveness */
@media (max-width: 720px) {
.modal-dialog {
  max-width: 80%;
}
.modal-content {
  max-width: 100%;
}
.modal-body {
  padding: 20px;
}
}

/* EDIT PRODUCT MODAL STYLES */
#editProductModal {
  background: none;
}

.edit-modal-content {
  border-radius: 10px;
  background-color: #fff; 
}

.edit-modal-header {
  
  background-color: #848401; 
  color: #fff; 
}

.edit-modal-title {

}


 </style>