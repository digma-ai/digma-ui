# Copilot Instructions

Digma UI is a React-based frontend for the Digma continuous feedback platform, designed to help developers analyze and improve code quality and runtime behavior. The project is a monorepo for multiple React applications and provides the distributions for different platforms: Web and IDEs (JetBrains, Visual Studio and VS Code)

Tech stack: TypeScript, React, React Router, Tanstack Table, React Hook Form, Recharts, styled-components, RTK Query, zustand (deprecated), axios, Storybook, Jest, Webpack, ESLint.

## Project Structure

- **.github/**  
  GitHub-specific files such as workflows

- **scripts/**  
  Utility scripts for development, build, and CI/CD automation.

- **.husky/**  
  Git hooks managed by Husky for enforcing code quality and workflow automation.

- **.storybook/**  
  Storybook configuration files for UI component development and documentation.

- **.vscode/**  
  Visual Studio Code workspace settings and recommended extensions.

- **src/**  
   Main source code for the Digma UI applications, including all React components, features, hooks, utilities, and configuration.

- **src/components/**  
  Shared, reusable React components used across features and apps.

- **src/api/**  
  Contains custom message API-related code, including service definitions, types, and API clients for communicating with backend services.

- **src/containers/**  
  Entry points for React applications.

- **src/history/**  
  Custom container for application history state management.

- **src/hooks/**  
  Custom React hooks for shared logic across the applications.

- **src/logging/**  
  Logger for application events and errors.

- **src/redux/**  
  Redux store configuration, slices, and RTK Query services.

- **src/store/**  
  Zustand stores and state management logic (deprecated).

- **src/stories/**  
  Storybook stories for UI components.

- **src/typeGuards/**  
  TypeScript type guard functions for runtime type checking.

- **src/utils/**  
  General utility functions and helpers used throughout the project.

- **public/**  
  Static assets served by the app (e.g., images, fonts).

- **apps.ts**  
  Entry points and configuration for each distributive.

## Code Style

### JavaScript/TypeScript

- Use Boolean() constructor instead of !! operator for boolean casting.
- Follow the ESLint rules from `eslint.config.mjs`.

### TypeScript

- Use `import type` for all type-only imports.
- Define all type definitions and props in a `types.ts` file.

### React

- Each React component should reside in its own folder under the relevant feature/component directory.
- The main component file must be named `[Component]/index.tsx`.
- Do not import React at the top of files for JSX usage (React 18+).
- Do not import the React namespace unless it is actually needed (e.g., for types or APIs not available via direct import).
- Use implicit return for functional components when possible.
- Destructure component props in the function signature.

### Styles

- Import styles as: `import * as s from "./styles"`.
- Use a `styles.ts` file for styled-components definitions.
- The top-level styled component should be named `Container`.
- Do not use inline styles; use props with semantic names instead.
- Do not use the `font-family` CSS rule for `SF Pro Text` (treat as the default OS font). Only specify `font-family` if a non-default font is required.
- Use semantic color tokens from the theme (e.g., `theme.colors.v3.surface.primary`) instead of hardcoded color values or direct palette imports.
- Use typography mixins from `typographies.ts` wherever Figma specifies a typography variable. Do not hardcode font-size, font-weight, or line-height if a corresponding typography token exists.
- Avoid hardcoded colors, font sizes, and font weights if a semantic or design token exists.
- All styled-components should use theme values via the `theme` prop for colors and typography, ensuring support for both dark and light themes.
- Do not use inline types for styled-components. Always create and import interfaces for props used in styled-components from the component's `types.ts` file.
- Do not use className prop without the need
- Follow Stylelint rules for all CSS/styled-components code from `stylelint.config.js`.

### Images

- Use standard `<img>` tags for images, styled via styled-components if needed.

### Storybook & Tests

- Create a Storybook file named `[Component].stories.tsx` for stories.
- Create a test file named `[Component].test.tsx` for tests.
