module.exports = {
  extends: ["@nuxtjs", "@nuxtjs/eslint-config-typescript"],
  rules: {
    "no-console": "warn",
    "prefer-const": "error",
    quotes: ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
    "max-len": [
      "error",
      {
        code: 120,
      },
    ],
    "comma-dangle": ["error", "always-multiline"],
    semi: "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
    "newline-before-return": "warn",
    indent: ["error", "tab"],
  },
};
