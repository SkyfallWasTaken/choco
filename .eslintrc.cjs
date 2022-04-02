module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"ignorePatterns": ["scripts/*"],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],

		// Disable React-specific lints
		"react/react-in-jsx-scope": 0,
		"react/display-name": 0,
		"react/no-unescaped-entities": 0,
		"no-unused-vars": ["error", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false, "varsIgnorePattern": "createElement" }]
	}
};
