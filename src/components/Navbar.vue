<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top mx-auto">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">
            <span class="logo-text">VentureVibe</span>
          </router-link>
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavbar"
        >
        <i class="fa-solid fa-bars"></i>
          <!-- <span class="navbar-toggler-icon"></span> -->
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav mx-auto">
            <router-link exact class="nav-item nav-link" to="/">
              Home
            </router-link>
            <router-link exact class="nav-item nav-link" to="/about">
              About
            </router-link>
            <router-link exact class="nav-item nav-link" to="/getawayhub">
              GetAwayHub
            </router-link>
            <router-link exact class="nav-item nav-link" to="/contact">
              Contact
            </router-link>
            
            <router-link v-if="hasJWT && isAdmin === 'Administrator'" exact class="nav-item nav-link" to="/admin">
              Admin 
              <!-- && isAdmin === 'Administrator' -->
            </router-link>

            <router-link v-if="!hasJWT" exact class="nav-item nav-link" to="/SignUp">
              SignUp
            </router-link>
            <router-link v-if="!hasJWT" exact class="nav-item nav-link" to="/loginSign">
              Login 
            </router-link>
          </div>
          <div class="navbar-nav ml-auto">

            <button v-if="hasJWT" class="cart-btn">
            <router-link class=" nav-item nav-link d-flex align-items-center" to="/cart" style="font-size: 24px;">
                <i class="fa-solid fa-cart-shopping cart-icon"></i>
            </router-link>
          </button>

         
          <!-- Logout button -->
          <button v-if="hasJWT" @click="confirmLogout" class="logOut">Logout</button>

           <!-- User Button/Icon -->
           <router-link v-if="hasJWT" class=" nav-item nav-link d-flex align-items-center" to="/profile" style="font-size: 24px;">
            <i class="fa-solid fa-user"></i>
            </router-link>
          <!-- <i class="fa-solid fa-user"></i> -->
          
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
// import HomeView  from '../router/index.js';

export default {
  computed: {
    hasJWT() {
      return !!this.$cookies.get('token');
    },
    isAdmin() {
      return $cookies.get('userRole')
}
// isAdmin() {
//       return this.$store.state.currentUser.currentUser.userRole
// }
  },
  methods: {
    confirmLogout() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(71, 98, 218)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!',
        position: 'top',
      }).then((result) => {
        if (result.isConfirmed) {
        // Remove JWT token
        this.$cookies.remove('token')
        this.$cookies.remove('userRole')
        // this.$store.dispatch('logOutUser');
        this.$router.push('/'); // Redirect to home page
      setTimeout(() => {
        // Refresh the page after a short delay
        window.location.reload();
      }, 10); 
        }
      });
    }
  }
};
</script>
  
<style scoped>
.navbar {
  padding: 20px;
  margin: 20px;
  background: white;
  border-radius: 50px;
  width: 85%;
}
.navbar-brand {
  font-size: 25px;
  margin-right: -30px;
}
.logo-text {
  display: inline-block;
  background: rgb(71, 98, 218);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 30px;
  transition: color 0.3s, transform 0.3s; 
}
.logo-text:hover{
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
}
.navbar-nav .nav-link {
  color: black;
  margin: 0 20px;
  font-size: 18px;
  transition: color 0.3s, transform 0.3s;
}
.navbar-nav .nav-link:hover {
  color: rgb(71, 98, 218);
  /* font-size: 20px; */
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
}
/* Active styling for navbar links */
.navbar-nav .nav-item .nav-link.router-link-exact-active {
  color: rgb(71, 98, 218);
  transform: scale(1.1);
}
.navbar-toggler {
  color: rgb(71, 98, 218);
  border: 2px solid rgb(71, 98, 218);
}
  
.cart-icon {
  background: white;
  -webkit-background-clip: text;
  color: transparent;
  /* margin-right: -50px; */
}
.cart-btn{
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  /* padding: 5px; */
  transition: color 0.3s, transform 0.3s;
  text-align: center;
}
.logOut{
  background-color: rgb(71, 98, 218) !important;
  border: none;
  border-radius: 20px;
  color:white;
  margin-left:10px;
  font-size: 18px;
  padding: 15px;
  transition: color 0.3s, transform 0.3s;
}
.logOut:hover{
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
}
i{
  color:rgb(71, 98, 218);
  /* border: 2px solid rgb(71, 98, 218); */
}
.fa-user {
  font-size: 35px; 
  margin-top: 4px;
  text-align: center;
  margin-left: 12px;
  transition: color 0.3s, transform 0.3s;
}
.fa-user:hover{
  transform: scale(1.1);
  transition: color 0.3s, transform 0.3s;
  cursor: pointer;
}
    
/* Optional: Adjust the styles of the collapsed navbar */
@media (max-width: 720px) {
.navbar-nav {
  margin-top: 10px;
}
.logo-text{
  font-size: 20px;
}
/* Center the cart icon on mobile devices */
.navbar-nav .text-center {
  text-align: center;
}
.cart-icon{
  margin-left: 18px;
}
.cart-btn{
  width: 60%;
  margin-left: 40px;
}
}
</style>
  