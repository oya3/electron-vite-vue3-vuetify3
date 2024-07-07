module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'plugin:vue/vue3-essential',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'vue',
  ],
  'rules': {
    // クォート
    'quotes': ['off'],
    // 'quote-props': ["error", "as-needed"],

    // 中括弧
    'object-curly-spacing': ['error', 'always'],

    // 文の末尾セミコロン
    'semi': ['off'],

    // オブジェクトや配列の最後の要素の後のカンマ
    // 'comma-dangle': ['error', 'always-multiline'],

    // すべての関数宣言にJSDocコメント
    // 'require-jsdoc': ['error','always'],

    // 関数名と括弧の間に常にスペース
    'space-before-function-paren': ['off'],

    // 行数
    'max-len': ['error', { 'code': 160 }],
  },
};
