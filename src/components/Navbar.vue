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
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav mx-auto">
              <router-link class="nav-item nav-link" to="/">
                Home
              </router-link>
              <router-link class="nav-item nav-link" to="/about">
                About
              </router-link>
              <router-link class="nav-item nav-link" to="/getawayhub">
                GetAwayHub
              </router-link>
              <router-link class="nav-item nav-link" to="/contact">
                Contact
              </router-link>
              <router-link class="nav-item nav-link" to="/admin">
                Admin
              </router-link>
            </div>
            <div class="navbar-nav ml-auto">
              <router-link class="nav-item nav-link d-flex align-items-center" to="/cart" style="font-size: 24px;">
                <i class="fa-solid fa-cart-shopping cart-icon"></i>
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
<style scoped>
    .navbar {
      padding: 20px;
      margin: 20px;
      background: white;
      border-radius: 50px;
      width: 95%;
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
      transition: color 0.3s; /* Add smooth transition */
      transition: color 0.3s, transform 0.3s;
    }
  
    .navbar-nav .nav-link:hover {
      color: rgb(71, 98, 218);
      /* font-size: 20px; */
      transform: scale(1.1);
     transition: color 0.3s, transform 0.3s;
    }
  
    .navbar-toggler-icon {
      color: #000;
    }
  
    .cart-icon {
      background: rgb(71, 98, 218);
      -webkit-background-clip: text;
      color: transparent;
      margin-right: -50px;
    }
  
    /* Optional: Adjust the styles of the collapsed navbar */
    @media (max-width: 767.98px) {
      .navbar-nav {
        margin-top: 10px;
      }
      /* Center the cart icon on mobile devices */
      .navbar-nav .text-center {
    text-align: center;
  }
    }
</style>
  