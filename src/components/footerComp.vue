<template>
  <footer class="text-white py-3 neon-animation">
    <div class="container">
      <div class="row">
        <p class="texts">
          VentureVibe &copy;
          <span>{{ currYear }}</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComp',
  data() {
    return {
      currYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
footer {
  background-color: white; 
  padding: 20px;
  border-radius: 50px;
  width: 85%;
  margin: 20px auto;
  margin-top: auto; 
  bottom: 0;
  margin-top: 50px;
  /* Add border and neon animation */
  border: 4px solid transparent;
  border-image-slice: 1;
  animation: neon-border 1.5s linear infinite alternate;
}

.texts {
  font-size: 22px;
  font-weight: bold;
  color: rgb(71, 98, 218);
  padding-top: 12px;
}

.texts span {
  font-weight: bold;
}

/* Responsive Styles */
@media (max-width: 720px) {
  .texts {
    font-size: 18px;
    padding-top: 10px;
  }
}

@media (max-width: 300px) {
  .texts {
    font-size: 16px;
    padding-top: 8px;
  }
}

@keyframes neon-border {
  from {
    border-color: rgb(191, 193, 198);
  }
  to {
    border-color: rgb(0, 47, 255);
  }
}
</style>
