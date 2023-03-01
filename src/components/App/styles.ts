import {
  createGlobalStyle,
  css,
  FlattenSimpleInterpolation
} from "styled-components";
import { environment } from "../../environment";
import { os } from "../../os";

export const getMainFont = (customFont: string): FlattenSimpleInterpolation => {
  let osFont = "";

  // Source: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/browser/media/style.css#L10
  if (environment === "VS Code") {
    if (os === "Linux") {
      osFont = 'system-ui, Ubuntu, "Droid Sans"';
    }

    if (os === "macOS") {
      osFont = "-apple-system, BlinkMacSystemFont";
    }

    if (os === "Windows") {
      osFont = '"Segoe WPC", "Segoe UI"';
    }
  }

  // Source: https://jetbrains.github.io/ui/principles/typography/#ide-font
  if (environment === "JetBrains") {
    if (os === "Linux") {
      osFont = "Ubuntu";
    }

    if (os === "macOS") {
      osFont = '"SF Pro Text"';
    }

    if (os === "Windows") {
      osFont = '"Segoe UI"';
    }
  }

  return css`
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: ${[customFont, osFont, "sans-serif"]
      .filter(Boolean)
      .join(", ")};
  `;
};

export const getCodeFont = (customFont: string): FlattenSimpleInterpolation => {
  let osFont = "";

  // Source: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/browser/media/style.css#L31
  if (environment === "VS Code") {
    if (os === "Linux") {
      osFont =
        '"Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New"';
    }

    if (os === "macOS") {
      osFont = '"SF Mono", Monaco, Menlo, Courier';
    }

    if (os === "Windows") {
      osFont = 'Consolas, "Courier New"';
    }
  }

  // Source: https://jetbrains.github.io/ui/principles/typography/#06
  if (environment === "JetBrains") {
    osFont = '"JetBrains Mono"';
  }

  return css`
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: ${[customFont, osFont, "monospace"]
      .filter(Boolean)
      .join(", ")};
  `;
};

export const GlobalStyle = createGlobalStyle`
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
