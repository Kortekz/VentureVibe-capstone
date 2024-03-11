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
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

.section-title {
  font-size: 45px;
  margin-bottom: 20px;
  display: inline-block;
  background: white;
  -webkit-background-clip: text;
  color: transparent;
}

.section-description {
  font-size: 20px;
  color: white; 
  margin-bottom: 30px;
}

.featured-image {
  border-radius: 20px;
  transition: transform 0.5s;
}

.featured-image:hover {
  transform: scale(1.05);
}

.featured-image-container {
  margin-bottom: 20px;
}
</style>
