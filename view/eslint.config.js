import vueEslintPlugin from 'eslint-plugin-vue';
import gEslintConfigJS from '../eslint.config.js';

export default [
	...vueEslintPlugin.configs['flat/recommended'],
	...vueEslintPlugin.configs['vue3-essential'],
	...vueEslintPlugin.configs['vue3-recommended'],

	// 极高要求
	...vueEslintPlugin.configs['vue3-strongly-recommended'],

	// 主框架规则集
	...gEslintConfigJS,

	{
		rules: {},
	},
];
