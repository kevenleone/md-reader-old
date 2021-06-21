module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "prettier/standard",
    "prettier/react",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "simple-import-sort",
    "sort-destructure-keys",
    "sort-keys-fix",
  ],
  rules: {
    "@typescript-eslint/no-use-before-define": ["error"],
    camelcase: "off",
    "no-explicit-any": "off",
    "no-use-before-define": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    semi: ["error", "always"],
    "simple-import-sort/sort": "error",
    "sort-destructure-keys/sort-destructure-keys": [
      2,
      { caseSensitive: false },
    ],
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: true, minKeys: 2, natural: false },
    ],
    "sort-keys-fix/sort-keys-fix": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
