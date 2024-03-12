<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <!-- Content Section 1 -->
          <section class="my-5">
            <h2 class="section-title">Welcome to <span class="logo-text">VentureVibe</span></h2>
            <p class="section-description">
              Discover a world of experiences and adventures with VentureVibe. Whether you're looking for music,
              travel, or unforgettable moments, we've got you covered.
            </p>
          </section>

          <!-- Content Section 2 -->
          <section class="my-5">
            <h2 class="section-title">Featured</h2>

            <div class="row">
              <div class="col-md-6 featured-image-container mr-4">
                <img
                  src="https://i.ibb.co/L9X6ypx/dj-playing-music-mixer.jpg"
                  alt="DJ playing music mixer"
                  class="img-fluid featured-image"
                />
              </div>
              <div class="col-md-6 featured-image-container ml-4">
                <img
                  src="https://i.ibb.co/rw72q6R/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand.jpg"
                  alt="Beautiful girl standing at viewpoint"
                  class="img-fluid featured-image"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  background-color: white; /* Set background color to white */
  border-radius: 50px; /* Add border-radius to match navbar */
  margin-top: 100px;
  margin-left: 110px;
  margin-bottom: 50px;
  width: 85%;
}

.container {
}

.col-md-8 {
  width: 90%; /* Ensure the content takes full width within the container */
}

.section-title {
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 20px;
  display: inline-block;
  background-color: rgb(71, 98, 218); /* Match the navbar background color */
  -webkit-background-clip: text;
  color: transparent;
}

.section-description {
  font-size: 20px;
  color: black; /* Change text color to black */
  margin-bottom: 30px;
}

.featured-image {
  border-radius: 20px;
  margin-top: 20px;
  transition: transform 0.5s, box-shadow 0.5s; /* Add box-shadow transition */
  height: 350px;
}

.featured-image:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(71, 98, 218, 1); /* Add box-shadow on hover */
}

.featured-image-container {
  margin-bottom: 20px;
}

/* Responsive Styles */
@media (max-width: 720px) {
  .home {
    flex-direction: column;
    align-items: center;
    margin-left: 25px;
  }

  .col-md-8 {
    width: 80%;
  }

  .featured-image {
    border-radius: 20px;
    margin-top: 20px;
    transition: transform 0.5s;
    height: 250px !important;
  }
}

@media (max-width: 500px) {
  .section-title {
    font-size: 25px;
  }

  .featured-image {
    border-radius: 20px;
    margin-top: 20px;
    transition: transform 0.5s;
    height: 200px !important;
  }
}

@media (max-width: 300px) {
  .section-title {
    font-size: 25px;
  }

  .featured-image {
    border-radius: 20px;
    margin-top: 20px;
    transition: transform 0.5s;
    height: 200px !important;
  }
}
</style>
