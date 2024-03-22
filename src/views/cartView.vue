<template>
  <div class="cart" style="min-height: 100vh;">
    

    <div v-if="cart.length === 0">

      <!-- Show spinner -->
      <h1>Cart is Empty</h1>
      <spinner-comp></spinner-comp>
    </div>

    <div v-else>
      <h1>Cart</h1>

    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="table-responsive">
          <table class="table table-striped custom-table">
            <thead>
              <tr>
                <!-- <th class="purple-header">ID</th> -->
                <th class="purple-header">Image</th>
                <th class="purple-header">Product Name</th>
                <th class="purple-header">Quantity</th>
                <th class="purple-header">Price</th>
                <th class="purple-header">Total Price</th>
                <th class="purple-header">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.cartID">
                <!-- <td>{{ item.orderID }}</td> -->
                <td><img :src="item.imageUrl" alt="" class="img-fluid"></td>
                <td> <p>{{ item.name }}</p> </td>
                <td> <p>{{ item.soldQuantity }} </p></td>
                <td> <p>{{ item.pricePerItem }} </p></td>
                <td> <p>{{ item.totalPrice }}</p></td>
                <td><button @click="confirmRemoveItem(item.hubID)" class="btn btn-danger">Remove</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class= "checkout" @click="checkout"> Checkout </button>
      </div>
      </div>
    </div>
  </div>


</template>

<script>
import Swal from 'sweetalert2';
import spinnerComp from '../components/spinnerComp.vue';

export default {
  components:{
    spinnerComp
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    // checkout() {
    //   this.$store.dispatch('checkout')
    // }
  },
  methods: {
    async removeItemFromCart(hubID) {
  try {
    await this.$store.dispatch('removeFromCart', hubID);
    Swal.fire('Poof! Your item has been deleted!', '', 'success')
      .then(() => {
        // Reload the page after the user closes the success message
        window.location.reload();
      });
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
},
    confirmRemoveItem(hubID) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeItemFromCart(hubID);
        }
      });
    },
    async checkout() {
      // Perform checkout action
      try {
        this.$store.dispatch('checkout')
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Checkout Successful!',
          text: 'Thank you for your order.',
        }).then(() => {
          // Reload the page after the user closes the success message
          window.location.reload();
        });
      } catch (error) {
        console.error('Error during checkout:', error);
        // Handle error if needed
      }
    },
  },
  mounted() {
    this.$store.dispatch('getCartUser');
  },
};
</script>

<style scoped>
/* .cart {
  margin-top: 80px;
} */

h1 {
  color: white; /* Changed heading color to purple */
  margin-top: 80px;
}
p{
  color: black;
  font-size: 18px;
}
th{
  font-size: 20px;
}
.purple-header {
  background-color: rgb(71, 98, 218) !important; /* Set table header background color to purple */
  color: white; /* Set text color to white for better visibility */
}

.table {
  width: 100%; /* Modified table width */
  margin-top: 20px;
}

img {
  height: 120px;
  width: 180px;
  border-radius: 20px !important;
}

.custom-table {
  border-radius: 10px !important; /* Added border radius to the table */
}
td{
  padding:20px;
}
.checkout{
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 20px;
  color:white;
  margin-left:10px;
  font-size: 18px;
  padding: 15px;
  transition: color 0.3s, transform 0.3s;
}
.checkout:hover{
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
}

</style>
