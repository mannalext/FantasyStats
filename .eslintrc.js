module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended"
  ],
  overrides: [
    {
      files: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "unicorn/consistent-function-scoping": "off",
      },
    },
  ],
  rules: {
    eqeqeq: "error",
  },
  parser: "@typescript-eslint/parser",
};