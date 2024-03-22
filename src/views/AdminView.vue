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
            <tr v-for="product in getProducts" :key="product.hubID">
              <td>{{ product.hubID }}</td>
              <td><img :src="product.imageUrl" alt="Product Image" ></td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.category }}</td>
              <td>{{ formatDate(product.date) }}</td>
              <td>
                <button class="btn btn-warning" @click="editProduct(product)" data-toggle="modal" data-target="#editProductModal">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" @click="deleteProduct(product.hubID)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      
      
      </div>
  
  <!-- Add Product Modal -->
  <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
          </div>

          <div class="modal-body">
            <!-- Form for adding a new product -->
            <form >
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
            <form>
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary mr-2" @click="updateProduct">Update</button>
            </div>

            </form>
          </div>
        </div>
      </div>
    </div>


     
    
    <h2 class="text-center mb-4">Users</h2>
    
    <!-- Edit User -->
    <div class="bodyEdit">
        <!-- Form for editing an existing user -->
        
          <div class="form-group" >
            <label for="editName">Name:</label>
            <input type="text" class="form-control" id="editName" v-model="firstName">
          </div>
          <div class="form-group">
            <label for="editLastName">Last Name:</label>
            <input type="text" class="form-control" id="editLastName" v-model="lastName">
          </div>
          <div class="form-group">
            <label for="editEmail">Email:</label>
            <input type="email" class="form-control" id="editEmail" v-model="email">
          </div>
          <div class="form-group">
        <label for="userRole">User Role:</label>
        <select id="userRole" v-model="userRole" class="form-control">
          <option value="Customer">Customer</option>
          <option value="Administrator">Administrator</option>
        </select>
      </div>
          <div class="form-group">
            <label for="editPassword">Password:</label>
            <input type="password" class="form-control" id="editPassword" v-model="password" required>
          </div>
          <!-- <button type="submit" class="btn btn-primary" @click="updateUser">Update User</button> -->
        
      </div>

    <!-- Button to open Add User Modal -->
    <button type="button" class="btn btn-success mb-2" data-toggle="modal" data-target="#addUserModal">
      Add User Modal
    </button>
    <!-- USER TABLE -->
    <div class="container mt-5">

      <table class="table">
        <!-- Table Headers -->
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Password</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr v-for="user,index in getUsers" :key="user.userID">
            <!-- User Data -->
            <td>{{ index+1 }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.userRole }}</td>
            <td>{{ user.password }}</td>
            <td>
              <button class="btn btn-warning" @click="updateUser(user.userID)">
                <i class="fas fa-edit"></i>
              </button>

              <button class="btn btn-danger" @click="deleteUser(user.userID)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add User Modal -->
<div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addUserModalLabel">Add User</h5>

        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->

      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="firstName" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="surname">Surname:</label>
          <input type="text" id="surname" v-model="lastName" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="userRole">User Role:</label>
          <select id="userRole" v-model="userRole" class="form-control" required>
            <option value="Customer">Customer</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="addUser">Add User</button>
      </div>
    </div>
  </div>
</div>


      


<!-- CART TABLE -->
<div>
    <h2 class="adminHead">Admin Cart Table</h2>

    
    <div class="container-cart d-flex flex-column align-items-center">
  <div class="mb-3 d-flex flex-wrap">
    <div class="mb-3 me-3">
      <label for="quantity" class="form-label1">Quantity :</label>
      <input v-model="quantity" type="number" class="form-control1" id="quantity" placeholder="Enter Quantity">
    </div>

    <div class="mb-3 me-3">
      <label for="hubID" class="form-label1">Product ID :</label>
      <input v-model="hubID" type="text" class="form-control1" id="hubID" placeholder="Enter Product ID">
    </div>

    <div class="mb-3">
      <label for="userID" class="form-label1">User ID :</label>
      <input v-model="userID" type="text" class="form-control1" id="userID" placeholder="Enter User ID">
    </div>
  </div>
  
  <div class="d-flex justify-content-center">
    <button @click="addCartAdmin" class="btn-add">Add To Cart</button>
  </div>
</div>

    <table class="tableCart centered-table">
      <thead>
        <tr>
          <th class="purple-header">Order ID</th>
          <th class="purple-header">Quantity</th>
          <th class="purple-header">Product ID</th>
          <th class="purple-header">User ID</th>
          <th class="purple-header">Action</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getCarts" :key="item.orderId">
          <td class="cartText">{{ item.orderId }}</td>
          <td class="cartText">{{ item.quantity }}</td>
          <td class="cartText">{{ item.hubID }}</td>
          <td class="cartText">{{ item.userID }}</td>
          <td class="cartText">
            
          <button  @click="editCart(item.orderId)" class="btn btn-warning" >
            <i class="fas fa-edit"></i>
          </button>

          <button @click="deleteCart(item.orderId)" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
          </button>
        
        </td>
        </tr>
      </tbody>
    </table>

 

    
  </div>

</div>
</template>
  
<script>
import spinnerComp from '../components/spinnerComp.vue';
import Swal from 'sweetalert2';

export default {
components: {
spinnerComp,
},

data() {
  return {
    name: '',
    imageUrl: '',
    description: '',
    price: '',
    category: '',
    date: '',
    selectedProduct: {},
    editedUser: {},
    // cart:[],
    userID: null,
    quantity:null,
    hubID:null,
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    userRole:''
  }
},
// data() {
//   return {
//     firstName:'',
//     lastName:'',
//     email:'',
//     userRole:'',
//     password:'',
//   }
// },
computed: {
  getProducts() {
    return this.$store.state.products;
  },
  getUsers() {
      return this.$store.state.users;
    },
    getCarts(){
      return this.$store.state.cart
    },
    addCartAdmin() {
      // Dispatch the Vuex action to add the item to the cart
      this.$store.dispatch('addCartAdmin', this.$data)
      // Reload the window
      window.location.reload();
    
},
  addProduct() {
    this.$store.dispatch('addProduct', this.$data).then(() => {
    Swal.fire('Product Added!', 'The Product has been added.', 'success')
    }).catch((error) => {
      console.error('Error adding user:', error);
      Swal.fire('Error', 'There was an error adding the Product. Please try again.', 'error');
    });
      },
    },
mounted() {
  this.$store.dispatch('getProducts');
  this.$store.dispatch('getUsers');
  this.$store.dispatch('getCart')
},
methods: {
 // Update User
updateUser(userID) {
  let edit = {
    userID: userID,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    userRole: this.userRole
  };

  this.$store.dispatch('updateUser', edit)
  // Reload the location after the user clicks OK
  window.location.reload();
},

  // EDIT CART
  editCart(orderId){
      let edit = {
        id: orderId,
        userID: this.userID,
        quantity: this.quantity,
        hubID: this.hubID
      }
      console.log(edit)
      this.$store.dispatch('editCart',edit)
    },
    // DELETE CART
    deleteCart(orderId){
      this.$store.dispatch('deleteCart',orderId)
      .then(() => {
      // Show a success SweetAlert message
      Swal.fire({
        title: 'Item Deleted!',
        text: 'The item has been successfully Deleted.',
        icon: 'success',
        confirmButtonColor: 'rgb(71, 98, 218)', 
        confirmButtonText: 'OK',
      }).then(() => {
        // Reload the window
        window.location.reload();
      });
    })
    },

async addUser() {
  try {
    // Dispatch the addUser action from Vuex store with user data
    await this.$store.dispatch('addUser', { 
      firstName: this.firstName, 
      lastName: this.lastName, 
      email: this.email, 
      password: this.password,
      userRole: this.userRole
    });

    console.log('User added successfully');
    window.location.reload();

    // Close the modal using vanilla JavaScript
    document.getElementById('addUserModal').classList.remove('show');
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop').remove();
    // Reset form data
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.userRole = '';  
  } catch (error) {
    console.error('Error adding user:', error);
    // Show error message using    
  
  }
},

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
  // editProduct(product) {
  //   // Set the selectedProduct to the details of the product being edited
  //   this.selectedProduct = { ...product };
  //   // Open the edit product modal
  //   $('#editProductModal').modal('show');
  //   },

    updateProduct() {
  let edit = {
    id: this.selectedProduct.hubID, 
    name: this.selectedProduct.name,
    imageUrl: this.selectedProduct.imageUrl,
    description: this.selectedProduct.description,
    price: this.selectedProduct.price,
    category: this.selectedProduct.category,
    date: this.selectedProduct.date
  };
  this.$store.dispatch('updateProduct', edit).then(() => {
    Swal.fire('Product Updated!', 'The Product has been updated.', 'success');
    // Close the modal after updating
    $('#editProductModal').modal('hide');
  }).catch((error) => {
    console.error('Error updating product:', error);
    Swal.fire('Error', 'There was an error updating the Product. Please try again.', 'error');
  });
},
    closeEditModal() {
    $('#editProductModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    // After hiding and removing, reset the modal content
    this.selectedProduct = {};
  },
  deleteUser(userId) {
      this.$store.dispatch('deleteUser', userId);
      window.location.reload()
    },

    // editCart(orderID){
    //   let edit = {
    //     id:orderID,
    //     userID: this.userID,
    //     quantity: this.quantity,
    //     hubID: this.hubID
    //   }
    //   this.$store.dispatch('editCart',edit)
    // },
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
.adminHead{
  color: white;
  margin-top: 40px;
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
  /* margin-top: 20px; */
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
  font-size: 20px;
  color: white;
  width: 100px;
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
 
  #addUserModal .modal-dialog {
    margin: auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-height: calc(100% - 58rem);
  }

  #addUserModal .modal-content {
    max-width: 400px;
    margin: 0 auto;
    background-color: #fff; 
    border-radius: 10px; 
  }

  /* Optional: Customize modal header and title */
  #addUserModal .modal-header {
    background-color: rgb(71, 98, 218);
    color: #fff;
    border-radius: 10px 10px 0 0; 
  }

  #addUserModal .modal-title {
    font-size: 20px; 
  }

  #addUserModal .modal-body {
    text-align: left; 
    padding: 30px; 
  }
  #addUserModal .form-control {
    font-size: 16px; 
    border: 1px solid #ccc; 
    border-radius: 5px; 
    margin-bottom: 15px; 
  }

  #addUserModal .modal-footer {
    border-top: none; 
    justify-content: center; 
  }

  #addUserModal .btn-primary {
    background-color: rgb(71, 98, 218);
    color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
  }

  #addUserModal .btn-secondary {
    background-color: #ccc;
    color: #000;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
  }

 /* EDIT USER MODAL */
 #editUserModal .modal-dialog {
  margin: auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: calc(100% - 58rem); /* Adjust this value as needed */
}

#editUserModal .modal-content {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
}

/* Optional: Customize modal header and title */
#editUserModal .modal-header {
  background-color: rgb(71, 98, 218);
  color: #fff;
  border-radius: 10px 10px 0 0;
}

#editUserModal .modal-title {
  font-size: 20px;
}

#editUserModal .modal-body {
  text-align: left;
  padding: 30px;
}

#editUserModal .form-control {
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

#editUserModal .modal-footer {
  border-top: none;
  justify-content: center;
}

#editUserModal .btn-primary {
  background-color: rgb(71, 98, 218);
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
}
.close{
  background-color: rgb(71, 98, 218);
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  border:none
}

#editUserModal .btn-secondary {
  background-color: #ccc;
  color: #000;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
}

.tableCart {
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
    background-color: white; /* Set background color to white */
    color: black; /* Set text color to black */
    text-align: center; /* Center the content of the table */
}

.tableCart th {
    background-color: rgb(71, 98, 218);
    color: white;
    padding: 20px;
}

.tableCart td {
    font-size: 18px;
    padding: 10px;
}

.tableCart tbody tr:hover {
    background-color: rgba(71, 98, 218, 0.1);
}

/* Added styles for centering the table */
.centered-table {
    width: 85%;
    margin: 0 auto;
}

/* CART TABLE TEXT */
.cartText {
    color: black; /* Set text color to black */
}

/* CART TABLE STYLES */
/* Form container */
.container-cart {
  margin: 40px auto;
  max-width: 1000px; /* Increased max-width for better spacing */
  background-color: #ffffff; /* White background */
  padding: 20px;
  padding-top: 50px !important;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

/* Form label */
.form-label1 {
  font-size: 18px;
  font-weight: bold;
  color: #000000; 
  margin: 18px 0; 
  margin-right: 12px; 
}

/* Form input */
.form-control1 {
  margin-bottom: 15px;
  border: 2px solid #ced4da; 
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
}

/* Add button */
.btn-add {
  background-color: rgb(71, 98, 218); 
  color: #ffffff; 
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add:hover {
  background-color: #4e6cd2; 
}

/* Edit User Modal Styling */
.bodyEdit {
  max-width: 500px;
  margin: 0 auto;
  background-color: white;
  padding:40px;
  border-radius: 20px;
  margin-bottom: 15px;
}

/* USER EDIT FORM */
/* Form group */
.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

/* Form label */
label {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin-right: 10px;
}

/* Form input */
.form-control {
  flex: 2;
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #ced4da;
}

/* Select input */
select.form-control {
  flex: 2;
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #ced4da;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6"></path></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
}

/* Submit button */
.btn-primary {
  background-color: rgb(71, 98, 218);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  width: 60%;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #4e6cd2;
}


 </style>