<template>


<div class="contact-container">
    <div class="contact-info-container">
      <div class="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Address:</strong> 123 Main Street, Cityville</p>
        <p><strong>Email:</strong> VentureVibe@gmail.com</p>
        <p><strong>Phone:</strong> +27 21 129 0655</p>
        <p><strong>Hours:</strong> Mon-Fri: 9am-5pm</p>
        <p>A friendly team member is ready to assist you with any inquiries.</p>
      </div>
    </div>
    


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
  </div>
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
    max-width: 1200px !important;
    margin: auto;
    padding: 60px;
    border: 2px solid #ccc;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
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

.contact-container {
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
  margin-top: 40px;
}

.contact-info-container {
  max-width: 400px;
  height: 50%;
  background-color: white;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* margin-bottom: 40px; */
  margin: 0 auto;
  margin-top: 250px;
}

.contact-info h2 {
  color: rgb(71, 98, 218);
  font-size: 24px;
  margin-bottom: 20px;
}

.contact-info p {
  margin-bottom: 10px;
  color: black;
  font-size: 18px;
}

.contact-form {
  /* width: 100%; */
}

.contact-info{
  
  
}
/* Media queries for mobile responsiveness */
@media (max-width: 720px) {
  .contact-container {
    flex-direction: column;
  }
  
  .contact-info,
  .contact-form {
    width: 100%;
  }
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
  