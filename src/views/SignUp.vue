<template>
  <div class="login-container">
    <h1>Signup</h1>

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
          <!-- <option value="Administrator">Administrator</option> -->
        </select>
      </div>

      <button type="submit" @click="signUp">Signup</button>

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
      userRole: '',
    };
  },
  methods: {
    async signUp() {
  try {
   
    // Dispatch the addUser action from Vuex store with user data
    await this.$store.dispatch('signUp', { 
      firstName: this.firstName, 
      lastName: this.lastName, 
      email: this.email, 
      password: this.password,
      userRole: this.userRole
    });
    
    // Show success message using SweetAlert
    Swal.fire('User Added!', 'The user has been added.', 'success').then(() => {
      // Refresh the page after the user clicks OK
      this.$router.push('/loginSign'); 
    });

  } catch (error) {
    console.error('Error adding user:', error);
    // Show error message using SweetAlert
    Swal.fire('Error', 'There was an error adding the user. Please try again.', 'error');
  }
},
  },
};
</script>

<style scoped>
h1 {
  color: rgb(71, 98, 218);
  padding-bottom: 20px;
}

.login-container {
  margin-top: 100px !important;
  max-width: 500px;
  margin: auto;
  padding: 60px;
  border: 2px solid #ccc;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
  color: black;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 2px solid rgb(71, 98, 218);
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 18px;
  color: black;
}

button {
  width: 100%;
  padding: 10px;
  background-color: rgb(71, 98, 218);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
}

button:hover {
  background-color: rgb(45, 61, 136);
}
</style>
