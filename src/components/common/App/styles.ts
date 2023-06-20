import {
  createGlobalStyle,
  css,
  DefaultTheme,
  FlattenSimpleInterpolation
} from "styled-components";
import { os } from "../../../os";
import { platform } from "../../../platform";

export const getMainFont = (customFont: string): FlattenSimpleInterpolation => {
  let osFont = "";

  // Sources
  //
  // VS Code: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/browser/media/style.css#L10
  //
  // JetBrains:
  // https://jetbrains.github.io/ui/principles/typography/#ide-font
  // https://github.com/JetBrains/intellij-community/blob/master/platform/platform-impl/src/com/intellij/ide/ui/laf/LafManagerImpl.kt#L1278
  if (os === "Linux") {
    osFont = 'system-ui, Ubuntu, "Droid Sans"';
  }

  if (os === "macOS") {
    osFont = "-apple-system, BlinkMacSystemFont";
  }

  if (os === "Windows") {
    osFont = '"Segoe WPC", "Segoe UI"';
  }

  return css`
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: ${[`"${customFont}"`, osFont, "sans-serif"]
      .filter(Boolean)
      .join(", ")};
  `;
};

export const getCodeFont = (customFont: string): FlattenSimpleInterpolation => {
  let osFont = "";

  // Source: https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/config/editorOptions.ts#L4721
  if (platform === "VS Code") {
    if (os === "Linux") {
      osFont = '"Droid Sans Mono", "monospace"';
    }

    if (os === "macOS") {
      osFont = 'Menlo, Monaco, "Courier New"';
    }

    if (os === "Windows") {
      osFont = 'Consolas, "Courier New"';
    }
  }

  // Sources:
  // https://jetbrains.github.io/ui/principles/typography/#06
  // https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/editor/colors/FontPreferences.java#L111
  if (platform === "JetBrains") {
    osFont = '"JetBrains Mono"';
  }

  return css`
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: ${[`"${customFont}"`, osFont, "monospace"]
      .filter(Boolean)
      .join(", ")};
  `;
};

export const getThemeKind = (theme: DefaultTheme): "light" | "dark" => {
  switch (theme.mode) {
    case "light":
      return "light";
    case "dark":
    case "dark-jetbrains":
      return "dark";
  }
};

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => getThemeKind(theme)};
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
    ${({ theme }) => getMainFont(theme.mainFont)}
  }
`;
