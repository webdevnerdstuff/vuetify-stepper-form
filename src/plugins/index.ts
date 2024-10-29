import type { App } from 'vue';
import vuetify from '@/plugins/vuetify';


export function registerPlugins(app: App) {
	app.use(vuetify);
}
