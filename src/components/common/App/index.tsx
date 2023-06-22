import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dispatcher } from "../../../dispatcher";
import { Mode } from "../../../globals";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { addPrefix } from "../../../utils/addPrefix";
import { GlobalStyle } from "./styles";
import { AppProps } from "./types";

export const THEMES = ["light", "dark", "dark-jetbrains"];

const isMode = (mode: unknown): mode is Mode => {
  return isString(mode) && THEMES.includes(mode);
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

export const actions = addPrefix(ACTION_PREFIX, {
  SET_THEME: "SET_THEME",
  SET_MAIN_FONT: "SET_MAIN_FONT",
  SET_CODE_FONT: "SET_CODE_FONT",
  OPEN_URL_IN_DEFAULT_BROWSER: "OPEN_URL_IN_DEFAULT_BROWSER",
  SEND_TRACKING_EVENT: "SEND_TRACKING_EVENT",
  SET_IS_JAEGER_ENABLED: "SET_IS_JAEGER_ENABLED"
});

const defaultMainFont = isString(window.mainFont) ? window.mainFont : "";
const defaultCodeFont = isString(window.codeFont) ? window.codeFont : "";

export const App = (props: AppProps) => {
  const [mode, setMode] = useState(getMode());
  const [mainFont, setMainFont] = useState(defaultMainFont);
  const [codeFont, setCodeFont] = useState(defaultCodeFont);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.debug(e);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!props.theme) {
      return;
    }
    setMode(props.theme);
  }, [props.theme]);

  useEffect(() => {
    const handleSetTheme = (data: unknown) => {
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

    dispatcher.addActionListener(actions.SET_THEME, handleSetTheme);
    dispatcher.addActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
    dispatcher.addActionListener(actions.SET_CODE_FONT, handleSetCodeFont);

    return () => {
      dispatcher.removeActionListener(actions.SET_THEME, handleSetTheme);
      dispatcher.removeActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
      dispatcher.removeActionListener(actions.SET_CODE_FONT, handleSetCodeFont);
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
