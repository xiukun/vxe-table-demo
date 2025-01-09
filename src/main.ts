import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initVxeTable } from './plugins/vxe-table'
const app = createApp(App)
app.use(initVxeTable)
app.mount('#app')
