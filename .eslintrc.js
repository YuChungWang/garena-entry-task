// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },

  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],

  // required to lint *.vue files
  plugins: ['vue'],

  // check if imports actually resolve
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: 'webpack.config.js',
  //     },
  //   },
  // },

  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: true,
      },
    ],

    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
        ],
      },
    ],

    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // see: https://eslint.org/docs/rules/arrow-parens#always
    'arrow-parens': ['error', 'always'],

    // allow plusplus for loop
    // see: https://eslint.org/docs/rules/no-plusplus#allowforloopafterthoughts
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // allow reassignment of parameters props
    // see: https://eslint.org/docs/rules/no-param-reassign#props
    'no-param-reassign': ['error', { props: false }],

    // allow mixed operators
    // see: https://eslint.org/docs/rules/no-mixed-operators
    // see also: https://github.com/prettier/eslint-config-prettier#no-mixed-operators
    'no-mixed-operators': 'off',

    // Prettier insists putting operator AFTER the line
    'operator-linebreak': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': ['error', { consistent: true }],
  },
};
