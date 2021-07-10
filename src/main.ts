import { createApp } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import installElementPlus from './plugins/element';
import './styles/index.less';
import './icons'; // icons

const app = createApp(App);
installElementPlus(app);
setupRouter(app);

setupStore(app);

app.component('SvgIcon', SvgIcon); // global register icon component

router.isReady().then(() => {
  app.mount('#app');
});
