import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';  // vuetifyパレットカラーを利用するためにはGlobal CSSの”vuetify/styles”のimportが必要
// import './assets/main.css'
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import router from "./router"; // src/router/index.js を参照

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    }
  }
});
createApp(App).use(vuetify).use(router).mount('#app');
