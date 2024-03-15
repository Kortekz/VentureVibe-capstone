<template>
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addUserModalLabel">Add User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="firstName" required>
        </div>
  
        <div class="form-group">
          <label for="surname">Surname:</label>
          <input type="text" id="surname" v-model="lastName" required>
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
  
        <div class="form-group">
          <label for="userRole">User Role:</label>
          <select id="userRole" v-model="userRole" required>
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
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userRole: ''
      };
    },
    methods: {
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
          // Show success message and redirect if needed
          Swal.fire('User Added!', 'The user has been added.', 'success');
          // Close the modal
          $('#addUserModal').modal('hide');
        } catch (error) {
          console.error('Error adding user:', error);
          Swal.fire('Error', 'There was an error adding the user. Please try again.', 'error');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your modal styles go here */
  </style>
  