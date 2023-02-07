import { ThemeProvider } from "styled-components";
import { Mode } from "../../globals";
import { RecentActivity } from "../RecentActivity";
import { GlobalStyle } from "./styles";

const getMode = (): Mode => {
  if (!window.theme) {
    const bodyEl = document.getElementsByTagName("body");
    const vscodeTheme =
      bodyEl[0].dataset.vscodeThemeKind === "vscode-light" ? "light" : "dark";
    return vscodeTheme;
  }

  return window.theme;
};

export const App = () => (
  <>
    <ThemeProvider theme={{ mode: getMode() }}>
      <GlobalStyle />
      <RecentActivity />
    </ThemeProvider>
  </>
);
