import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { actions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { Mode } from "../../../globals";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { ConfigContext } from "./ConfigContext";
import { getTheme } from "./getTheme";
import { GlobalStyle } from "./styles";
import {
  AppProps,
  BackendInfo,
  DigmaStatus,
  Environment,
  GlobalState,
  Scope
} from "./types";

export const THEMES = ["light", "dark", "dark-jetbrains"];

export const isBackendInfo = (info: unknown): info is BackendInfo =>
  isObject(info) &&
  isString(info.applicationVersion) &&
  isString(info.deploymentType);

const isMode = (mode: unknown): mode is Mode =>
  isString(mode) && THEMES.includes(mode);

export const isDigmaStatus = (status: unknown): status is DigmaStatus =>
  isObject(status) &&
  isObject(status.connection) &&
  (isString(status.connection.type) || isNull(status.connection.type)) &&
  Array.isArray(status.runningDigmaInstances);

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

    const handleSetJaegerURL = (data: unknown) => {
      if (isObject(data) && isString(data.jaegerURL)) {
        setConfig((config) => ({
          ...config,
          jaegerURL: data.jaegerURL as string
        }));
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

    const handleSetDigmaStatus = (data: unknown) => {
      if (isDigmaStatus(data)) {
        setConfig((config) => ({
          ...config,
          digmaStatus: data
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

    const handleSetDigmaApiUrl = (data: unknown) => {
      if (isObject(data) && isString(data.url)) {
        setConfig((config) => ({
          ...config,
          digmaApiUrl: data.url as string
        }));
      }
    };

    const handleSetUserRegistrationEmail = (data: unknown) => {
      if (isObject(data) && isString(data.email)) {
        setConfig((config) => ({
          ...config,
          userRegistrationEmail: data.email as string
        }));
      }
    };

    const handleSetEnvironment = (data: unknown) => {
      if (isObject(data) && isEnvironment(data?.environment)) {
        setConfig((config) => ({
          ...config,
          environment: data.environment as Environment
        }));
      }
    };

    const handleIsObservabilityEnabled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isObservabilityEnabled)) {
        setConfig((config) => ({
          ...config,
          isObservabilityEnabled: data.isObservabilityEnabled as boolean
        }));
      }
    };

    const handleSetBackendInfo = (data: unknown) => {
      if (isBackendInfo(data)) {
        setConfig((config) => ({
          ...config,
          backendInfo: data
        }));
      }
    };

    const handleSetEnvironments = (data: unknown) => {
      if (isObject(data) && Array.isArray(data.environments)) {
        setConfig((config) => ({
          ...config,
          environments: data.environments as Environment[]
        }));
      }
    };

    const handleSetIsMicrometerProject = (data: unknown) => {
      if (isObject(data)) {
        setConfig((config) => ({
          ...config,
          isMicrometerProject: data.isMicrometerProject as boolean
        }));
      }
    };

    const handleSetScope = (data: unknown) => {
      setConfig((config) => ({
        ...config,
        scope: data as Scope
      }));
    };

    const handleSetState = (data: unknown) => {
      setConfig((config) => ({
        ...config,
        state: data as GlobalState
      }));
    };

    dispatcher.addActionListener(actions.SET_THEME, handleSetTheme);
    dispatcher.addActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
    dispatcher.addActionListener(actions.SET_CODE_FONT, handleSetCodeFont);
    dispatcher.addActionListener(actions.SET_JAEGER_URL, handleSetJaegerURL);
    dispatcher.addActionListener(actions.SET_STATE, handleSetState);
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
      actions.SET_DIGMA_STATUS,
      handleSetDigmaStatus
    );
    dispatcher.addActionListener(
      actions.SET_IS_DOCKER_INSTALLED,
      handleSetIsDockerInstalled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DOCKER_COMPOSE_INSTALLED,
      handleSetIsDockerComposeInstalled
    );
    dispatcher.addActionListener(
      actions.SET_DIGMA_API_URL,
      handleSetDigmaApiUrl
    );
    dispatcher.addActionListener(
      actions.SET_USER_REGISTRATION_EMAIL,
      handleSetUserRegistrationEmail
    );
    dispatcher.addActionListener(actions.SET_ENVIRONMENT, handleSetEnvironment);
    dispatcher.addActionListener(
      actions.SET_IS_OBSERVABILITY_ENABLED,
      handleIsObservabilityEnabled
    );
    dispatcher.addActionListener(
      actions.SET_BACKEND_INFO,
      handleSetBackendInfo
    );
    dispatcher.addActionListener(
      actions.SET_ENVIRONMENTS,
      handleSetEnvironments
    );
    dispatcher.addActionListener(
      actions.SET_IS_MICROMETER_PROJECT,
      handleSetIsMicrometerProject
    );
    dispatcher.addActionListener(actions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(actions.SET_THEME, handleSetTheme);
      dispatcher.removeActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
      dispatcher.removeActionListener(actions.SET_CODE_FONT, handleSetCodeFont);
      dispatcher.removeActionListener(actions.SET_STATE, handleSetState);
      dispatcher.removeActionListener(
        actions.SET_JAEGER_URL,
        handleSetJaegerURL
      );
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
        actions.SET_DIGMA_STATUS,
        handleSetDigmaStatus
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DOCKER_INSTALLED,
        handleSetIsDockerInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DOCKER_COMPOSE_INSTALLED,
        handleSetIsDockerComposeInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_DIGMA_API_URL,
        handleSetDigmaApiUrl
      );
      dispatcher.removeActionListener(
        actions.SET_USER_REGISTRATION_EMAIL,
        handleSetUserRegistrationEmail
      );
      dispatcher.removeActionListener(
        actions.SET_ENVIRONMENT,
        handleSetEnvironment
      );
      dispatcher.removeActionListener(
        actions.SET_IS_OBSERVABILITY_ENABLED,
        handleIsObservabilityEnabled
      );
      dispatcher.removeActionListener(
        actions.SET_BACKEND_INFO,
        handleSetBackendInfo
      );
      dispatcher.removeActionListener(
        actions.SET_ENVIRONMENTS,
        handleSetEnvironments
      );
      dispatcher.removeActionListener(
        actions.SET_IS_MICROMETER_PROJECT,
        handleSetIsMicrometerProject
      );
      dispatcher.removeActionListener(actions.SET_SCOPE, handleSetScope);
    };
  }, []);

  const theme = getTheme(mode, mainFont, codeFont);

  return (
    <>
      <ConfigContext.Provider value={config}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {props.children}
        </ThemeProvider>
      </ConfigContext.Provider>
    </>
  );
};
