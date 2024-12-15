import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
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
        ecmaVersion: 2022
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
  // TODO: Fix types by updating "eslint-plugin-react-hooks" once the following issue is resolved
  // https://github.com/facebook/react/issues/28313
  // https://github.com/facebook/react/pull/30774
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "react-hooks": reactHooksPlugin
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    rules: reactHooksPlugin.configs.recommended.rules
  },
  storybookPlugin.configs["flat/recommended"],
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
  }
);
