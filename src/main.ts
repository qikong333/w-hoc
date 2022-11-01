import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'
import 'ant-design-vue/dist/antd.css'
import { createPinia } from 'pinia'
import i18n from './lang'

const pinia = createPinia()
const app = createApp(App as any)
    .use(pinia)
    .use(i18n)
    .use(router)
    .mount('#app')
