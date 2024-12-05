import { createApp } from 'vue'
import "animate.css";
import "./assets/less/main.less";
import 'ant-design-vue/dist/reset.css';
import "./tailwind.css";

import App from './App.vue'
import router from './router'

import Header from '@/components/header.vue'
import HeaderChild from '@/components/headerChild.vue'
import Title from '@/components/title.vue'
import filters from './plugins/filters'; // 引入过滤器插件

const app = createApp(App)

app.component("pangge-Header", Header);
app.component("pangge-Header-Child", HeaderChild);
app.component("pangge-Title", Title);
app.use(filters);
app.use(router)
app.mount('#app')
