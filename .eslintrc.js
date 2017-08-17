/**
 * ESLint configuration
 * http://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],

  env: {
    node: true,
    mocha: true,
  },

  rules: {
    // Validate Javascript documentation comments
    // http://eslint.org/docs/rules/valid-jsdoc
    'valid-jsdoc': ['error', {
      "prefer": {
        "arg": "param",
        "argument": "param",
        "class": "constructor",
        "returns": "return",
        "virtual": "abstract"
      },
      "preferType": {
        "Boolean": "boolean",
        "bool": "boolean",
        "Number": "number",
        "Object": "object",
        "String": "string",
        "Function": "function",
        "Symbol": "symbol",
        "array": "Array",
        "buffer": "Buffer",
        "promise": "Promise"
      },
      "requireParamDescription": false,
      "requireReturnDescription": false,
    }],

    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: [
          "test/*.js",
        ],
      },
    ],


    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      'error',
      {
        // https://github.com/prettier/prettier#options
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
