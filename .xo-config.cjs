module.exports = {
    rules: {
        "jsx-quotes": ["error", "prefer-double"],
        "@typescript-eslint/quotes": ["error", "double"],
        "unicorn/empty-brace-spaces": 0,
        "unicorn/filename-case": 0,
        "import/extensions": 0,
        "import/no-anonymous-default-export": 0,
        "@typescript-eslint/object-curly-spacing": 0,
        "generator-star-spacing": 0,

        // Slshx types Message as any for some reason
        // so this is needed
        "@typescript-eslint/no-unsafe-return": 0
    },
    quotes: ["error", "double"],
};
