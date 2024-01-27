import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';  // vuetifyパレットカラーを利用するためにはGlobal CSSの”vuetify/styles”のimportが必要
// import './assets/main.css'
import { createVuetify } from 'vuetify';

const vuetify = createVuetify();
createApp(App).use(vuetify).mount('#app');

