import { createApp } from 'vue'
import App from './App.vue'
import ValueFormatter from './components/ValueFormatter.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.component('value-formatter', ValueFormatter)

app.mount('#app')
