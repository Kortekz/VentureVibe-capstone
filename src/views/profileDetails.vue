<template>
    <div>
      <h1>User Profile Details</h1>
      <div v-if="userProfile">
        <p>Name: {{ userProfile.firstName }} 
            {{ userProfile.lastName }}</p>
        <p>Email: {{ userProfile.email }}</p>
       
      </div>
      <div v-else>
        <p>Loading user profile...</p>
      </div>
    </div>
  </template>
  
  <script>
 
  
  export default {
    computed: {
      
    },
    created() {
      
    },
    methods: {
    
    }
  }
  </script>
  