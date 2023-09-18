import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
import { createManager } from '@vue-youtube/core'

const app = createApp(App);
app.use(store)
app.use(router)
app.use(createManager())
app.mount('#app')

