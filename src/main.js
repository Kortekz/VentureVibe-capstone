import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuecookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  

import '@fortawesome/fontawesome-free/css/all.css';

createApp(App).use(store).use(router).use(Vuecookies).mount('#app')
