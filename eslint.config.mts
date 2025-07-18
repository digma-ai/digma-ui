import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jestPlugin from "eslint-plugin-jest";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["!.storybook", "dist/", "jaeger-ui/", "storybook-static/"]
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2023
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error"
    }
  },
  {
    files: ["**/*.tsx"],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    files: ["**/*.tsx"],
    ...reactPlugin.configs.flat["jsx-runtime"]
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...reactHooksPlugin.configs["recommended-latest"]
  },
  storybookPlugin.configs["flat/recommended"],
  {
    files: ["**/*.test.ts"],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals
    }
  },
  eslintConfigPrettier,
  // Custom rules
  {
    rules: {
      curly: "error",
      "no-console": "error",
      "no-useless-return": "error"
    }
  },
  {
    files: ["**/*.tsx"],
    rules: {
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "always", children: "ignore", propElementValues: "always" }
      ]
    }
  },
  {
    files: ["src/components/common/icons/**/*Icon.tsx"],
    rules: {
      "react/jsx-curly-brace-presence": "off"
    }
  },
  {
    files: ["src/redux/services/digmaCodeGen.ts"],
    rules: {
      "@typescript-eslint/dot-notation": "warn",
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-indexed-object-style": "warn",
      "@typescript-eslint/consistent-type-definitions": "warn"
    }
  }
);
