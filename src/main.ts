import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'virtual:windi.css'
import 'ant-design-vue/dist/antd.css'
import JsonViewer from 'vue3-json-viewer'
const app = createApp(App as any)
    .use(router)
    .use(store)
    .use(JsonViewer)
    .mount('#app')
