import path from 'path';
import { defineConfig } from 'vite';
import ElementPlus from 'unplugin-element-plus/vite';
import vue from '@vitejs/plugin-vue';

const resolveTo = (p: string) => {
	return path.resolve(__dirname, p);
};

export default defineConfig({
	plugins: [vue(), ElementPlus({ useSource: true })],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
			scss: {
				additionalData: `@use "./app/style/element/index.scss" as *;`,
			},
		},
	},
	resolve: {
		alias: [
			{
				find: '@engine',
				replacement: resolveTo('./engine'),
			},
			{
				find: '@role_control',
				replacement: resolveTo('./role_control'),
			},
			{
				find: '@shared/api',
				replacement: resolveTo('./shared/api'),
			},
			{
				find: '@shared/component',
				replacement: resolveTo('./shared/component'),
			},
			{
				find: '@shared/composable',
				replacement: resolveTo('./shared/composable'),
			},
			{
				find: '@shared/const',
				replacement: resolveTo('./shared/const'),
			},
			{
				find: '@shared/request',
				replacement: resolveTo('./shared/request/index.ts'),
			},
			{
				find: '@shared/router',
				replacement: resolveTo('./shared/router/index.ts'),
			},
			{
				find: '@shared/utils',
				replacement: resolveTo('./shared/utils'),
			},
		],
	},
});
