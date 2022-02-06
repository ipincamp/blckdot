module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ["airbnb-base"],
	parserOptions: { ecmaVersion: "latest" },
	rules: {
		"consistent-return": "off",
		"global-require": "off",
		"import/no-dynamic-require": "off",
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		"no-console": "off",
		"no-restricted-syntax": "off",
		"no-tabs": "off",
		"no-unused-vars": "warn",
		"no-useless-return": "off",
		"prefer-const": "off",
		quotes: ["error", "double"],
	},
};
