import globals from 'globals';
import tsEslint from 'typescript-eslint';
import jsPlugin from '@eslint/js';

export default [
	{
		languageOptions: {
			globals: globals.node,
		},
	},

	jsPlugin.configs.recommended,
	...tsEslint.configs.recommended,

	{
		rules: {
			'no-console': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
		},
	},
];
