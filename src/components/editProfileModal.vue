<template>
    <div class="edit-modal" v-if="showModal">
      <div class="modal-content">
        <h2>Edit User Details</h2>
        <form @submit.prevent="submitForm">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="formData.firstName" required>
  
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="formData.lastName" required>
  
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required>
  
          <button type="submit">Update</button>
          <button @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: Object, // User object containing firstName, lastName, and email
    },
    data() {
      return {
        showModal: false,
        formData: {
          firstName: '',
          lastName: '',
          email: '',
        },
      };
    },
    watch: {
      user: {
        handler(newUser) {
          // Update formData when user prop changes
          this.formData.firstName = newUser.firstName;
          this.formData.lastName = newUser.lastName;
          this.formData.email = newUser.email;
        },
        immediate: true, // Call handler immediately on component mount
      },
    },
    methods: {
      submitForm() {
        // Call updateUser method from parent component with formData
        this.$emit('update-user', this.formData);
        this.closeModal();
      },
      closeModal() {
        this.showModal = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input,
  button {
    margin-bottom: 10px;
  }
  </style>
  