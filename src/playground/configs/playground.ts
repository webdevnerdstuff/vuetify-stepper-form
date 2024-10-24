import '@/libraries/fontawesome';
import PlaygroundApp from './PlaygroundApp.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerPlugins } from '../../plugins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createVStepperForm } from '../../plugin/index';


const app = createApp(PlaygroundApp);

app.use(createVStepperForm());
app.use(createPinia());
app.component('font-awesome-icon', FontAwesomeIcon);

app.component('FaIcon', FontAwesomeIcon);

registerPlugins(app);

app.mount('#app');
