import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElContainer from "./components/container";
import ElButton from './components/button';
import ElForm from './components/form';
import ElNotification from './components/notification';
import ElTree from './components/tree';

const app = createApp(App);
app.config.globalProperties.$AILEMENTE = {
    size: 'large'
}
    app.use(ElContainer)
        .use(ElButton)
        .use(ElForm)
        .use(ElNotification)
        .use(ElTree)
        .mount('#app')
