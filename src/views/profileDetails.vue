<template>
    <div class="profile-details">
      <h2 class="static-heading">Profile Details</h2>

      <div v-if="userProfile" class="content">
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
          <h3 class="profile-content">Your are Currently a {{ userProfile.currentUser.userRole }}</h3>
        </div>


      </div>
      <div v-else>
        <spinnerComponent></spinnerComponent>
      </div>
    </div>
  </template>
  
  <script>

 import spinnerComponent from '../components/spinnerComp.vue';
  
 export default {
   
    components: {
      spinnerComponent
    },
    // Computed property to access currentUser state from Vuex store
    computed: {
      userProfile() {
        return this.$store.state.currentUser;
      },
    },
    // decode token and set user info on component 
    mounted() {
      this.decodeTokenAndSetUserInfo();
    },
    // Method to decode JWT token and set user info in Vuex store
    methods: {
      decodeTokenAndSetUserInfo() {
        // Retrieve token from cookies
        let encode = $cookies.get('token');
        if (encode) {
          // Extract payload from JWT token
          encode = encode.split('.')[1];
          // Decode payload JSON
          const decodedToken = JSON.parse(window.atob(encode));
          console.log(decodedToken);
          // Commit decoded token to Vuex store
          this.$store.commit('setCurrentUser', decodedToken); 
        }
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
    margin-bottom: 20px; 
    display: inline-block;
    background-color: rgb(71, 98, 218);
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .profile-title {
    font-size: 30px;
    color: black;
    margin-bottom: 5px; 
  }
  .profile-content{
    font-size: 30px;
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
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .profile-details {
      margin-left: 25px;
    }
  }
  </style>
  