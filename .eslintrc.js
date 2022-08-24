module.exports = {
	env: {
		browser: false,
		node: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base'
	],
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	rules: {
		indent: 'off',
		'no-tabs': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'max-len': 'off', // Due to the long descriptions of params
		'global-require': 'off',
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		camelcase: 'off',
	},
};
