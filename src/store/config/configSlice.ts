import { createSlice } from "zustand-slices";
import type {
  BackendInfo,
  DigmaStatus,
  PersistedState,
  RunConfiguration,
  Scope,
  UserInfo
} from "../../components/common/App/types";
import type { Environment } from "../../redux/services/types";
import { isBoolean } from "../../typeGuards/isBoolean";
import { isEnvironment } from "../../typeGuards/isEnvironment";
import { isString } from "../../typeGuards/isString";

export interface ConfigState {
  digmaApiUrl: string | null;
  digmaApiProxyPrefix: string | null;
  digmaStatus: DigmaStatus | null;
  isDigmaEngineInstalled: boolean | null;
  isDigmaEngineRunning: boolean | null;
  isDockerInstalled: boolean | null;
  isDockerComposeInstalled: boolean | null;
  backendInfo: BackendInfo | null;
  jaegerURL: string | null;
  jaegerApiPath: string | null;
  isJaegerEnabled: boolean | null;
  isMicrometerProject: boolean | null;
  runConfig: RunConfiguration | null;
  isObservabilityEnabled: boolean | null;
  productKey: string | null;
  isDigmathonModeEnabled: boolean | null;
  isDigmathonGameFinished: boolean | null;
  environment: Environment | null;
  environments: Environment[] | null;
  userId: string | null;
  userInfo: UserInfo | null;
  userEmail: string | null;
  userRegistrationEmail: string | null;
  persistedState: PersistedState | null;
  selectedServices: string[] | null;
  scope: Scope | null;
  areInsightSuggestionsEnabled: boolean | null;
  isAgenticEnabled: boolean | null;
  googleClientId: string | null;
  isSandboxModeEnabled: boolean | null;
  postHogApiKey: string | null;
  postHogHost: string | null;
  productFruitsWorkspaceCode: string | null;
}

const initialState: ConfigState = {
  digmaApiUrl: isString(window.digmaApiUrl) ? window.digmaApiUrl : null,
  digmaApiProxyPrefix: isString(window.digmaApiProxyPrefix)
    ? window.digmaApiProxyPrefix
    : null,
  digmaStatus: null,
  isDigmaEngineInstalled: isBoolean(window.isObservabilityEnabled)
    ? window.isObservabilityEnabled
    : null,
  isDigmaEngineRunning: isBoolean(window.isDigmaEngineRunning)
    ? window.isDigmaEngineRunning
    : null,
  isDockerInstalled: isBoolean(window.isDockerInstalled)
    ? window.isDockerInstalled
    : null,
  isDockerComposeInstalled: isBoolean(window.isDockerComposeInstalled)
    ? window.isDockerComposeInstalled
    : null,
  backendInfo: null,
  jaegerURL: isString(window.jaegerURL) ? window.jaegerURL : null,
  jaegerApiPath: isString(window.jaegerApiPath) ? window.jaegerApiPath : null,
  isJaegerEnabled: isBoolean(window.isJaegerEnabled)
    ? window.isJaegerEnabled
    : null,
  isMicrometerProject: isBoolean(window.isMicrometerProject)
    ? window.isMicrometerProject
    : null,
  runConfig: null,
  isObservabilityEnabled: isBoolean(window.isObservabilityEnabled)
    ? window.isObservabilityEnabled
    : null,
  productKey: isString(window.productKey) ? window.productKey : null,
  isDigmathonModeEnabled: isBoolean(window.isDigmathonModeEnabled)
    ? window.isDigmathonModeEnabled
    : null,
  isDigmathonGameFinished: isBoolean(window.isDigmathonGameFinished)
    ? window.isDigmathonGameFinished
    : null,
  environment: isEnvironment(window.environment) ? window.environment : null,
  environments: null,
  userId: isString(window.userId) ? window.userId : null,
  userInfo: null,
  userEmail: isString(window.userEmail) ? window.userEmail : null,
  userRegistrationEmail: isString(window.userRegistrationEmail)
    ? window.userRegistrationEmail
    : null,
  selectedServices: null,
  persistedState: null,
  scope: null,
  areInsightSuggestionsEnabled: isBoolean(window.areInsightSuggestionsEnabled)
    ? window.areInsightSuggestionsEnabled
    : null,
  isAgenticEnabled: isBoolean(window.isAgenticEnabled)
    ? window.isAgenticEnabled
    : null,
  googleClientId: isString(window.googleClientId)
    ? window.googleClientId
    : null,
  isSandboxModeEnabled: isBoolean(window.isSandboxModeEnabled)
    ? window.isSandboxModeEnabled
    : null,
  postHogApiKey: isString(window.postHogApiKey) ? window.postHogApiKey : null,
  postHogHost: isString(window.postHogHost) ? window.postHogHost : null,
  productFruitsWorkspaceCode: isString(window.productFruitsWorkspaceCode)
    ? window.productFruitsWorkspaceCode
    : null
};

const set = (update: Partial<ConfigState>) => (state: ConfigState) => ({
  ...state,
  ...update
});

export const configSlice = createSlice({
  name: "config",
  value: initialState,
  actions: {
    setDigmaApiUrl: (url: string) => set({ digmaApiUrl: url }),
    setDigmaApiProxyPrefix: (prefix: string) =>
      set({ digmaApiProxyPrefix: prefix }),
    setDigmaStatus: (status: DigmaStatus) => set({ digmaStatus: status }),
    setIsDigmaEngineInstalled: (isInstalled: boolean) =>
      set({ isDigmaEngineInstalled: isInstalled }),
    setIsDigmaEngineRunning: (isRunning: boolean) =>
      set({ isDigmaEngineRunning: isRunning }),
    setIsDockerInstalled: (isInstalled: boolean) =>
      set({ isDockerInstalled: isInstalled }),
    setIsDockerComposeInstalled: (isInstalled: boolean) =>
      set({ isDockerComposeInstalled: isInstalled }),
    setBackendInfo: (info: BackendInfo) => set({ backendInfo: info }),
    setJaegerURL: (url: string) => set({ jaegerURL: url }),
    setIsJaegerEnabled: (isEnabled: boolean) =>
      set({ isJaegerEnabled: isEnabled }),
    setIsMicrometerProject: (isMicrometer: boolean) =>
      set({ isMicrometerProject: isMicrometer }),
    setRunConfig: (config: RunConfiguration) => set({ runConfig: config }),
    setIsObservabilityEnabled: (isEnabled: boolean) =>
      set({ isObservabilityEnabled: isEnabled }),
    setProductKey: (key: string) => set({ productKey: key }),
    setIsDigmathonModeEnabled: (isEnabled: boolean) =>
      set({ isDigmathonModeEnabled: isEnabled }),
    setIsDigmathonGameFinished: (isFinished: boolean) =>
      set({ isDigmathonGameFinished: isFinished }),
    setEnvironment: (environment: Environment | null) => set({ environment }),
    setEnvironments: (environments: Environment[]) => set({ environments }),
    setUserId: (userId: string) => set({ userId }),
    setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
    setUserEmail: (email) => set({ userEmail: email }),
    setUserRegistrationEmail: (email: string) =>
      set({ userRegistrationEmail: email }),
    /** @deprecated */
    setPersistedState: (state: PersistedState) =>
      set({ persistedState: state }),
    setSelectedServices: (services: string[]) =>
      set({ selectedServices: services })
  }
});
