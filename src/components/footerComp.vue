<template>
  <footer class="text-white py-3">
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
</style>
