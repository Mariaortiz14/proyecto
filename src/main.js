import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import mitt from 'mitt';

const app = createApp(App);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.mount('#app');
