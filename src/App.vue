<template>
  <div id="app">
    <nav>
      <Navbar />
    </nav>
    <router-view />
    <footerComp/>
   
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import footerComp from './components/footerComp.vue'; 

export default {
  components: {
    Navbar,
    footerComp
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
  }
};
</script>

<style>

@font-face {
  font-family: 'Yorkten';
  src: url('./assets/Yorkten-NorReg.ttf') format('truetype'); 
  font-weight: 400; 
  font-style: normal;
}
#app {
  font-family: 'Yorkten', sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: url('https://i.ibb.co/KrSbVLR/2734787.png') no-repeat center fixed;
  background-size: 100%; 
  overflow-x: hidden;
  backdrop-filter: blur(1px); 
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 1250px) {
  body {
    background-size: cover; 
  }
}
/* Media query for smaller screens like 720px */
@media (max-width: 720px) {
  body {
    background-size: cover; 
  }
}

/* Media query for smaller screens like 300px */
@media (max-width: 290px) {
  body {
    background-size: 100%; 
  }
}
</style>
