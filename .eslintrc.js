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
    // ['error', 'always'] 中括弧の前後に常にスペースが必要です。
    // ['error', 'never'] 中括弧の前後にスペースを入れてはいけません。
    // ['off'], 無効
    'object-curly-spacing': ['off'],
    // ['error', 'always'] 文の末尾に常にセミコロンが必要です。
    // ['error', 'never'] 文の末尾にセミコロンを入れてはいけません。
    // ['off'], 無効
    'semi': ['off'],
    // ['error','always'] オブジェクトや配列の最後の要素の後に常にカンマが必要です。
    // ['error','never'] オブジェクトや配列の最後の要素の後にカンマを入れてはいけません。
    // ['off'], 無効
    'comma-dangle': ['off'],
    // ['error','always'] すべての関数宣言にJSDocコメントが必要です。
    // ['error','never'] 関数宣言にJSDocコメントを入れてはいけません。
    // ['off'] このルールを無効にします。
    'require-jsdoc': ['error','always'],
    // ['error','always'] 関数名と括弧の間に常にスペースが必要です。
    // ['error','never'] 関数名と括弧の間にスペースを入れてはいけません。
    // ['off'] このルールを無効にします。
    'space-before-function-paren': ['off'],
    // 許可行数
    'max-len': 120,
  },
};
