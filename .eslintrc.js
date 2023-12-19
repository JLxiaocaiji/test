// ESlint 检查配置
module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  globals:{
    "AMap": "true",
    "RPC": "true",
    "setIP": "true",
    "z": "true",
  },
  // rules: {
  //   "vue/no-unused-components": "off",
  // }
}
