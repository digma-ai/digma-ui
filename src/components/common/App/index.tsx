import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dispatcher } from "../../../dispatcher";
import { Mode } from "../../../globals";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { addPrefix } from "../../../utils/addPrefix";
import { ConfigContext } from "./ConfigContext";
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
  SET_IS_JAEGER_ENABLED: "SET_IS_JAEGER_ENABLED",
  SET_IS_DIGMA_INSTALLED: "SET_IS_DIGMA_INSTALLED",
  SET_IS_DIGMA_RUNNING: "SET_IS_DIGMA_RUNNING"
});

const defaultMainFont = isString(window.mainFont) ? window.mainFont : "";
const defaultCodeFont = isString(window.codeFont) ? window.codeFont : "";

export const App = (props: AppProps) => {
  const [mode, setMode] = useState(getMode());
  const [mainFont, setMainFont] = useState(defaultMainFont);
  const [codeFont, setCodeFont] = useState(defaultCodeFont);
  const [config, setConfig] = useState(useContext(ConfigContext));

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

    const handleSetIsJaegerEnabled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isJaegerEnabled)) {
        setConfig({ ...config, isJaegerEnabled: data.isJaegerEnabled });
      }
    };

    const handleSetIsDigmaInstalled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmaInstalled)) {
        setConfig({ ...config, isDigmaInstalled: data.isDigmaInstalled });
      }
    };

    const handleSetIsDigmaRunning = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmaRunning)) {
        setConfig({ ...config, isDigmaRunning: data.isDigmaRunning });
      }
    };

    dispatcher.addActionListener(actions.SET_THEME, handleSetTheme);
    dispatcher.addActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
    dispatcher.addActionListener(actions.SET_CODE_FONT, handleSetCodeFont);
    dispatcher.addActionListener(
      actions.SET_IS_JAEGER_ENABLED,
      handleSetIsJaegerEnabled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DIGMA_INSTALLED,
      handleSetIsDigmaInstalled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DIGMA_RUNNING,
      handleSetIsDigmaRunning
    );

    return () => {
      dispatcher.removeActionListener(actions.SET_THEME, handleSetTheme);
      dispatcher.removeActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
      dispatcher.removeActionListener(actions.SET_CODE_FONT, handleSetCodeFont);
      dispatcher.removeActionListener(
        actions.SET_IS_JAEGER_ENABLED,
        handleSetIsJaegerEnabled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DIGMA_INSTALLED,
        handleSetIsDigmaInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DIGMA_RUNNING,
        handleSetIsDigmaRunning
      );
    };
  }, []);

  return (
    <>
      <ConfigContext.Provider value={config}>
        <ThemeProvider theme={{ mode, mainFont, codeFont }}>
          <GlobalStyle />
          {props.children}
        </ThemeProvider>
      </ConfigContext.Provider>
    </>
  );
};
