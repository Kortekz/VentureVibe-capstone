<template>
    <form
      ref="form"
      action="https://formspree.io/f/xnqebpba"
      method="POST"
      class="login-container"
      @submit.prevent="submitForm"
    >
      <h1>Contact Us</h1>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" class="form-control" v-model="formData.name" >
      </div>
  
      <div class="form-group">
        <label for="surname">Surname:</label>
        <input type="text" id="surname" name="surname" class="form-control" v-model="formData.surname" >
      </div>
  
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" class="form-control" v-model="formData.email" >
      </div>
  
      <div class="form-group">
        <label for="message">Your message:</label>
        <textarea id="message" name="message" class="form-control" v-model="formData.message" ></textarea>
      </div>
  
      <button type="submit">Send</button>
    </form>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        formData: {
          name: '',
          surname: '',
          email: '',
          message: '',
        },
      };
    },
    methods: {
      async submitForm() {
        if (!this.validateForm()) {
          return; // Don't submit if form is invalid
        }
  
        try {
          // Submit the form
          this.$refs.form.submit();
        } catch (error) {
          console.error('Error submitting form:', error);
          // Show error message using SweetAlert
          Swal.fire('Error', 'There was an error submitting the form. Please try again.', 'error');
        }
      },
      validateForm() {
        // Perform custom form validation here
        if (!this.formData.name || !this.formData.surname || !this.formData.email || !this.formData.message) {
          // Show validation error using SweetAlert
          Swal.fire('Validation Error', 'Please fill in all fields.', 'error');
          return false;
        }
        return true; // Form is valid
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
  textarea {
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

  /* Media queries for mobile responsiveness */
@media  (max-width: 720px) {
  .login-container {
    padding: 20px;
    width:85%
  }
  input,
  textarea {
    font-size: 16px;
  }
  button {
    font-size: 16px;
  }
}
@media (max-width: 300px) {
  .login-container {
    padding: 10px;
  }
  input,
  textarea {
    font-size: 14px;
  }
  button {
    font-size: 14px;
    padding: 8px;
  }
}
  </style>
  