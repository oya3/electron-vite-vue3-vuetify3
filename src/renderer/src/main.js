import { createApp, provide } from 'vue';
import App from './App.vue';
import 'vuetify/styles'; // vuetifyパレットカラーを利用するためにはGlobal CSSの”vuetify/styles”のimportが必要
// import './assets/main.css'
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import router from "./router"; // src/router/index.js を参照

const vuetify = createVuetify({
  // https://qiita.com/mml/items/7bdffe5eb5044f861cf1
  theme: {
    // dark: ref(true),
    // defaultTheme: 'theme1',
    themes: {
      light: {
        colors: {
          titlebar: '#1976D2', // ライトモードのときのprimary色
          backpanel: 'rgba(214, 0, 0, 1)',
        },
      },
      dark: {
        colors: {
          titlebar: '#808080', // ダークモードのときのprimary色
          backpanel: 'rgba(214, 0, 0, 1)',
        },
      },
      custom: {
        // dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#6200EE',
          'primary-darken-1': '#3700B3',
          secondary: '#03DAC6',
          'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
// createApp(App).use(vuetify).use(router).mount('#app');
const app = createApp(App);
app.provide('vuetify', vuetify);
app.use(vuetify).use(router).mount('#app');
