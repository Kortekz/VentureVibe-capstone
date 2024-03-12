<!-- Login.vue -->

<template>


    <div class="login-container">
      <form @submit.prevent="submitForm">
        <h1>Login</h1>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      submitForm() {
        // Add your login logic here
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        // You can send the data to your server for authentication
      },
    },
  };
  </script>
  
<style scoped>
h1{
    color: rgb(71, 98, 218);
    padding-bottom: 20px;
    /* margin-top: 20px; */
}
.login-container {
    margin-top: 100px !important;
    max-width: 400px;
    /* max-height: 600px; */
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
  
  input {
    width: 100%;
    padding: 8px;
    border: 2px solid rgb(71, 98, 218);
    border-radius: 4px;
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
  