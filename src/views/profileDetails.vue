<template>

<div class="portContainer">

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

      
    </div>
    <button class="Delete" @click="confirmDelete(userProfile.currentUser.userID)">Delete</button>

    <div class="editDet">
      <!-- Edit User -->
      <div class="bodyEdit">
    <!-- Form for editing an existing user -->
    <h2 class="static-heading">You can Edit your details below</h2>


      <div class="form-group">
        <label for="editName">Name:</label>
        <input type="text" class="form-control" id="editName" v-model="firstName">
      </div>
      <div class="form-group">
        <label for="editLastName">Last Name:</label>
        <input type="text" class="form-control" id="editLastName" v-model="lastName">
      </div>
      <div class="form-group">
        <label for="editEmail">Email:</label>
        <input type="email" class="form-control" id="editEmail" v-model="email">
      </div>
      <div class="form-group">
        <label for="userRole">User Role:</label>
        <select id="userRole" v-model="userRole" class="form-control">
          <option value="Customer">Customer</option>
          <option value="Administrator">Administrator</option>
        </select>
      </div>
      <div class="form-group">
        <label for="editPassword">Password:</label>
        <input type="password" class="form-control" id="editPassword" v-model="password">
      </div>
      <button type="submit" class="Edit-btn" @click="updateUser(userProfile.currentUser.userID)">Edit Details</button>
    
  </div>
</div>
   
    <!-- <div v-else>
      <spinnerComponent></spinnerComponent>
    </div> -->
    
  </div> 
</div> 
  
</template>

<script>
import Swal from 'sweetalert2';
import spinnerComponent from '../components/spinnerComp.vue';

export default {
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
    updateUser(userID) {
  let edit = {
    userID: userID,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    userRole: this.userRole
  };
  this.$store.dispatch('updateUser', edit)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Details Updated Successfully!',
        text: 'You will now be redirected to the login page. Please Log In again',
        showConfirmButton: false,
        timer: 3000 // Auto close the success message after 2 seconds
      }).then(() => {
        // Redirect to the login page
        this.$cookies.remove('token')
        this.$cookies.remove('userRole')
        this.$router.push('/loginSign')
        setTimeout(() => {
        // Refresh the page after a short delay
        window.location.reload();
      }, 10)
      });
    })
    .catch(error => {
      console.error('Error updating details:', error);
      // Handle error if needed
    });
}

    
  }
};
</script>

<style scoped>
.portContainer{
  display: flex;
}
.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  padding-bottom: 50px;
  margin-top: 100px;
  margin-left: 120px;
  margin-bottom: 50px;
  width: 84%;
}
.profile-section,
.edit-section {
  flex: 1;
}

.static-heading {
  font-size: 25px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 30px;
  display: inline-block;
  background-color: rgb(71, 98, 218);
  -webkit-background-clip: text;
  color: transparent;
}

.profile-title {
  font-size: 20px;
  color: black;
  margin-bottom: 5px;
}

.profile-content {
  font-size: 18px;
  color: black;
  margin-bottom: 5px;
}

.profile-info {
  display: flex;
  /* align-items: center; */
  margin-bottom: 10px;
}
.profile-info h3 {
  margin-right: 10px;
}
.content {
  /* margin-left: 20px; */
}
.Delete {
  background-color: rgb(71, 98, 218);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  margin: 15px;
}
.Delete:hover {
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
  .content{
    margin-left:20px;
  }
  .Delete {
    font-size: 14px;
    padding: 8px;
    margin-top: 10px;
  }
}
/* form */
label{
  color: black;
  font-size: 18px;
}
.form-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }

  .form-group label {
    width: 120px; /* Adjust the width as needed */
    margin-right: 10px;
  }

  .form-control {
    flex: 1;
    padding: 10px;
    border: 1px solid rgb(71, 98, 218);
    border-radius: 5px;
    outline: none;
  }

  .Edit-btn {
    background-color: rgb(71, 98, 218);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 18px;
    margin: 15px;
  }

  .Edit-btn:hover {
    background-color: rgb(36, 49, 107);
  }

  @media screen and (max-width: 768px) {
    .form-group label {
      width: auto;
      margin-right: 0;
      margin-bottom: 5px;
    }

    .form-control {
      width: 100%;
    }

    .Edit-btn {
      padding: 8px 16px;
    }
  }

  @media screen and (max-width: 576px) {
    .form-group {
      flex-direction: column;
    }

    .form-group label {
      width: auto;
      margin-right: 0;
      margin-bottom: 5px;
    }

    .form-control {
      width: 100%;
    }

    .Edit-btn {
      padding: 6px 12px;
    }
  }
</style>
