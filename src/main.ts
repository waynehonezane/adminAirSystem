import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import globleComponent from '@/components/index.ts'
import '@/styles/index.scss'
import pinia from './store'
import router from './router/index.ts'
import './permission.ts'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus)
app.use(globleComponent)
app.use(pinia)

app.use(router)
app.mount('#app')
