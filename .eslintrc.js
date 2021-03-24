const eslintConfig = {
    parser: '@typescript-eslint/parser',
    plugins: ['typescript', '@typescript-eslint'],
    extends: [
        'airbnb',
        'plugin:prettier/recommended', // 支持perttier作为rules
        'plugin:import/typescript',
    ],
    env: {
        browser: false,
        node: true,
        jest: true,
    },
    globals: {
        window: true,
        document: true,
        hljs: true,
        showdown: true,
    },
    // error warning off
    rules: {
        'no-console': 'off',
        'import/extensions': [
            'error',
            'always',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
                jsx: 'never',
            },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },
};

module.exports = eslintConfig;
