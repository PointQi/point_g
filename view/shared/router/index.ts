/**
 * @file vue 路由导航
 */

import { createWebHashHistory, createRouter } from 'vue-router';
import { getRoleControlRoutes } from './routes';

const getRoutes = () => {
	return [...getRoleControlRoutes()];
};

const initRouter = () => {
	return createRouter({
		history: createWebHashHistory(),
		routes: getRoutes(),
	});
};

export { getRoutes, initRouter };
