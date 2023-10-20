import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiArrowUpCircleFill, PrSpinner  } from 'oh-vue-icons/icons';
import { createApp } from 'vue';

import App from './app/App.vue';
import router from './app/router';
import store from './app/store/store';

const app = createApp(App);

addIcons(BiArrowUpCircleFill, PrSpinner);

app.component('v-icon', OhVueIcon);

app.use(router);
app.use(store);
app.mount('#app');
