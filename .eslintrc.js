module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:storybook/recommended"
    // "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    curly: "error",
    "no-console": "error",
    "no-useless-return": "error",
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "always", children: "ignore", propElementValues: "always" }
    ]
  },
  overrides: [
    {
      files: ["./**/*.tsx"],
      excludedFiles: ["./src/common/icons/**/*Icon.tsx"],
      rules: {
        "react/jsx-curly-brace-presence": "off"
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  root: true
};
