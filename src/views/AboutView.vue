<template>
  <div class="home">
    <div class="container">
      <div class="content">

        <h1 class="head"> About VentureVibe </h1>

        <p> VentureVibe is an online vacation and booking platform that specializes in providing travelers with personalized and unique experiences around the world. Our mission is to make travel planning effortless and enjoyable, while ensuring that our customers have access to the best deals and exclusive offers.
        </p>
        <p> At VentureVibe, we understand that every traveler is different, which is why we offer a diverse range of vacation packages and services to cater to varying needs and preferences. Whether you're looking for a relaxing beach getaway, an adventurous trekking expedition, or a cultural exploration, we've got you covered.
        </p> 
        <p> We believe that travel should be accessible to everyone, which is why we strive to offer competitive prices and flexible payment options. Our platform is user-friendly and secure, ensuring that you can book your dream vacation with confidence. Thank you for choosing VentureVibe as your travel partner. We look forward to helping you plan your next adventure!
        </p>
      </div>

      <!-- Image on the right -->
      <img src="https://i.ibb.co/RgPQy2R/receptionist-elegant-suit-during-work-hours-with-customer.jpg" alt="Receptionist" class="about-image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  background-color: white; /* Set background color to white */
  border-radius: 50px; /* Add border-radius to match navbar */
  padding: 40px; 
  width: 90%; 
  margin-top: 100px;
  margin-bottom: 100px;
}

.content {
  flex: 1; /* Take up remaining space */
  padding-right: 20px; /* Add some spacing between text and image */
}

.head {
  color: rgb(71, 98, 218); /* Match the navbar text color */
  font-size: 35px;
  font-weight: 600;
  /* padding-bottom: 50px; */
}

p {
  color: black; /* Match the navbar text color */
  padding-top: 10px;
  font-size: 18px;
  font-weight: 500;
}

.about-image {
  max-width: 40%; /* Ensure the image doesn't exceed its container */
  border-radius: 10px; /* Add rounded corners to the image */
  margin-top: 50px;
}
</style>
