import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dispatcher } from "../../../dispatcher";
import { Mode } from "../../../globals";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { getActions } from "../../../utils/getActions";
import { GlobalStyle } from "./styles";
import { AppProps } from "./types";

export const THEMES = ["light", "dark", "dark-jetbrains"];

const isMode = (mode: unknown): mode is Mode => {
  return typeof mode === "string" && THEMES.includes(mode);
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

const ACTION_PREFIX = "GLOBAL";

export const actions = getActions(ACTION_PREFIX, {
  setColorMode: "SET_THEME",
  setMainFont: "SET_MAIN_FONT",
  setCodeFont: "SET_CODE_FONT",
  openURLInDefaultBrowser: "OPEN_URL_IN_DEFAULT_BROWSER",
  sendTrackingEvent: "SEND_TRACKING_EVENT",
  setIsJaegerEnabled: "SET_IS_JAEGER_ENABLED"
});

export const App = (props: AppProps) => {
  const [mode, setMode] = useState(getMode());
  const [mainFont, setMainFont] = useState("");
  const [codeFont, setCodeFont] = useState("");

  useEffect(() => {
    if (!props.theme) {
      return;
    }
    setMode(props.theme);
  }, [props.theme]);

  useEffect(() => {
    const handleSetColorMode = (data: unknown) => {
      if (isObject(data) && isMode(data.theme)) {
        setMode(data.theme);
      }
    };

    const handleSetMainFont = (data: unknown) => {
      if (isObject(data) && isString(data.mainFont)) {
        setMainFont(data.mainFont);
      }
    };

    const handleSetCodeFont = (data: unknown) => {
      if (isObject(data) && isString(data.codeFont)) {
        setCodeFont(data.codeFont);
      }
    };

    dispatcher.addActionListener(actions.setColorMode, handleSetColorMode);
    dispatcher.addActionListener(actions.setMainFont, handleSetMainFont);
    dispatcher.addActionListener(actions.setCodeFont, handleSetCodeFont);

    return () => {
      dispatcher.removeActionListener(actions.setColorMode, handleSetColorMode);
      dispatcher.removeActionListener(actions.setMainFont, handleSetMainFont);
      dispatcher.removeActionListener(actions.setCodeFont, handleSetCodeFont);
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={{ mode, mainFont, codeFont }}>
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </>
  );
};
