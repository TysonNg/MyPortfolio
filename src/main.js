import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import vuetify from "./vuetify";
import { createPinia } from 'pinia';

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(vuetify())
app.use(pinia)
app.mount('#app')