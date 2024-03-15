<template>
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
</template>

<script>
export default{
    computed:{
        addProduct() {
    this.$store.dispatch('addProduct', this.$data).then(() => {
    Swal.fire('Product Added!', 'The Product has been added.', 'success')
    }).catch((error) => {
      console.error('Error adding user:', error);
      Swal.fire('Error', 'There was an error adding the Product. Please try again.', 'error');
    });
      },
    }
}
</script>