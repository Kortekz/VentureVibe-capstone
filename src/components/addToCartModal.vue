<template>
 
  <!-- Modal -->
<div class="modal" tabindex="-1" role="dialog" id="addToCartModal" style="position: fixed; bottom: 0; left: 0; right: 0;">
  <div class="modal bottom-modal" tabindex="-1" role="dialog" id="addToCartModal">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Item to Cart</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeAddToCartModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form Inputs for Item Details -->
        <div class="form-group">
          <label for="productId">User ID:</label>
          <input type="text" class="form-control" id="productId" required>
        </div>
        <div class="form-group">
          <label for="productId">Product ID:</label>
          <input type="text" class="form-control" id="productId" required>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" class="form-control" id="quantity" required>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeAddToCartModal">Close</button>
        <button type="button" class="btn btn-primary" @click="addItemToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</div>


</template>

<script>

</script>

<style scoped>

</style>