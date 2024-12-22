import gEslintConfigJS from '../eslint.config.js';

export default [
	...gEslintConfigJS,

	{
		rules: {
			'no-console': 'warn',
		},
	},
];
