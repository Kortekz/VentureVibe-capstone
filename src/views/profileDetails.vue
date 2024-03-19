<template>
  <div class="profile-details">
    <h2 class="static-heading">Profile Details</h2>

    <div v-if="userProfile" :key="userProfile.currentUser.id" class="content">
      <div class="profile-info">
        <h3 class="profile-title">Name:</h3>
        <h3 class="profile-content">{{ userProfile.currentUser.firstName }}</h3>
      </div>

      <div class="profile-info">
        <h3 class="profile-title">Surname:</h3>
        <h3 class="profile-content">{{ userProfile.currentUser.lastName }}</h3>
      </div>

      <div class="profile-info">
        <h3 class="profile-title">Email:</h3>
        <h3 class="profile-content">{{ userProfile.currentUser.email }}</h3>
      </div>

      <div class="profile-info">
        <h3 class="profile-content">You are Currently a {{ userProfile.currentUser.userRole }}</h3>
      </div>

      <button class="Delete" @click="confirmDelete(userProfile.currentUser.userID)">Delete</button>

      <button class="Edit" @click="openEditModal">Edit Details</button>
    </div>

    <div v-else>
      <spinnerComponent></spinnerComponent>
    </div>
    
    <!-- MODAL FOR EDIT -->
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
  
          <button @click="closeModal">Cancel</button>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import spinnerComponent from '../components/spinnerComp.vue';

export default {
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    spinnerComponent
  },
  computed: {
    userProfile() {
      return this.$store.state.currentUser;
    },
  },
  mounted() {
    this.decodeTokenAndSetUserInfo();
  },
  methods: {
    decodeTokenAndSetUserInfo() {
      let encode = $cookies.get('token');
      if (encode) {
        encode = encode.split('.')[1];
        const decodedToken = JSON.parse(window.atob(encode));
        this.$store.commit('setCurrentUser', decodedToken);
      }
    },
    confirmDelete(id) {
      // Confirm deletion using SweetAlert or any other method
      swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete your account! This action cannot be reversed',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Call deleteUser method if user confirms deletion
          this.deleteUser(id);
        }
      });
    },
    
    deleteUser(userId) {
      // Call the deleteUser action from store
      this.$store.dispatch('deleteUser', userId)
        .then(() => {
          // logging the user out after deletion of user
          $cookies.remove('token');
          this.$router.push('/');
          setTimeout(() => {
            window.location.reload();
          }, 10);
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    },
     // Other methods...
     openEditModal() {
      this.showModal = true;
    },
    closeEditModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  padding-bottom: 50px;
  margin-top: 100px;
  margin-left: 110px;
  margin-bottom: 50px;
  width: 85%;
}

.static-heading {
  font-size: 35px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 30px;
  display: inline-block;
  background-color: rgb(71, 98, 218);
  -webkit-background-clip: text;
  color: transparent;
}

.profile-title {
  font-size: 25px;
  color: black;
  margin-bottom: 5px;
}

.profile-content {
  font-size: 25px;
  color: black;
  margin-bottom: 5px;
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.profile-info h3 {
  margin-right: 10px;
}
.content {
  margin-left: 20px;
}
.Delete {
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 20px;
  padding: 15px;
  margin-top: 20px;
  margin: 15px;
}
.Delete:hover {
  background-color: rgb(36, 49, 107) !important;
}
.Edit {
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 20px;
  padding: 15px;
  margin-top: 20px;
}
.Edit:hover {
  background-color: rgb(36, 49, 107) !important;
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
  .profile-details {
    margin-left: 55px !important;
    margin-top: 85px !important;
  }

  .profile-title,
  .profile-content {
    font-size: 20px;
  }

  .Delete {
    font-size: 16px;
    padding: 15px !important;
    margin-top: 15px;
  }
}

@media screen and (max-width: 300px) {
  .profile-details {
    margin-left: 25px !important;
    margin-top: 50px;
    padding: 10px;
  }

  .static-heading {
    font-size: 28px;
  }

  .profile-title,
  .profile-content {
    font-size: 18px;
  }

  .Delete {
    font-size: 14px;
    padding: 8px;
    margin-top: 10px;
  }
}
</style>
