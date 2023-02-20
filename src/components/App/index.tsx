import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dispatcher } from "../../dispatcher";
import { Mode } from "../../globals";
import { isObject } from "../../typeGuards/isObject";
import { RecentActivity } from "../RecentActivity";
import { GlobalStyle } from "./styles";

const isMode = (mode: unknown): mode is Mode => {
  return typeof mode === "string" && ["light", "dark"].includes(mode);
};

const getMode = (): Mode => {
  if (!isMode(window.theme)) {
    const bodyEl = document.getElementsByTagName("body");
    const vscodeTheme =
      bodyEl[0].dataset.vscodeThemeKind === "vscode-light" ? "light" : "dark";
    return vscodeTheme;
  }

  return window.theme;
};

const actions = {
  setColorMode: "GLOBAL/SET_THEME"
};

export const App = () => {
  const [mode, setMode] = useState(getMode());

  useEffect(() => {
    const handleSetColorMode = (data: unknown) => {
      if (isObject(data) && isMode(data.theme)) {
        setMode(data.theme);
      }
    };

    dispatcher.addActionListener(actions.setColorMode, handleSetColorMode);

    return () => {
      dispatcher.removeActionListener(actions.setColorMode, handleSetColorMode);
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={{ mode }}>
        <GlobalStyle />
        <RecentActivity />
      </ThemeProvider>
    </>
  );
};
