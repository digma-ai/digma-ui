import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { actions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { Mode } from "../../../globals";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
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

const defaultMainFont = isString(window.mainFont) ? window.mainFont : "";
const defaultCodeFont = isString(window.codeFont) ? window.codeFont : "";

export const App = (props: AppProps) => {
  const [mode, setMode] = useState(getMode());
  const [mainFont, setMainFont] = useState(defaultMainFont);
  const [codeFont, setCodeFont] = useState(defaultCodeFont);
  const [config, setConfig] = useState(useContext(ConfigContext));

  useEffect(() => {
    if (props.theme) {
      setMode(props.theme);
    }
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
        setConfig((config) => ({
          ...config,
          isJaegerEnabled: data.isJaegerEnabled as boolean
        }));
      }
    };

    const handleSetIsDigmaEngineInstalled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmaEngineInstalled)) {
        setConfig((config) => ({
          ...config,
          isDigmaEngineInstalled: data.isDigmaEngineInstalled as boolean
        }));
      }
    };

    const handleSetIsDigmaEngineRunning = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmaEngineRunning)) {
        setConfig((config) => ({
          ...config,
          isDigmaEngineRunning: data.isDigmaEngineRunning as boolean
        }));
      }
    };

    const handleSetIsDockerInstalled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDockerInstalled)) {
        setConfig((config) => ({
          ...config,
          isDockerInstalled: data.isDockerInstalled as boolean
        }));
      }
    };

    const handleSetIsDockerComposeInstalled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDockerComposeInstalled)) {
        setConfig((config) => ({
          ...config,
          isDockerComposeInstalled: data.isDockerComposeInstalled as boolean
        }));
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
      actions.SET_IS_DIGMA_ENGINE_INSTALLED,
      handleSetIsDigmaEngineInstalled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DIGMA_ENGINE_RUNNING,
      handleSetIsDigmaEngineRunning
    );
    dispatcher.addActionListener(
      actions.SET_IS_DOCKER_INSTALLED,
      handleSetIsDockerInstalled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DOCKER_COMPOSE_INSTALLED,
      handleSetIsDockerComposeInstalled
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
        actions.SET_IS_DIGMA_ENGINE_INSTALLED,
        handleSetIsDigmaEngineInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DIGMA_ENGINE_RUNNING,
        handleSetIsDigmaEngineRunning
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DOCKER_INSTALLED,
        handleSetIsDockerInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DOCKER_COMPOSE_INSTALLED,
        handleSetIsDockerComposeInstalled
      );
    };
  }, [config]);

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
