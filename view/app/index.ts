/**
 * @file 应用入口文件
 */

import { createApp } from 'vue';
import { initRouter } from '@shared/router';
import { initComponents } from './init/init_components';
import App from './app.vue';

import './style';

export const initApp = () => {
	const app = createApp(App);

	// 初始化
	initComponents(app);

	const router = initRouter();

	app.use(router);
	app.mount('#app');
};
