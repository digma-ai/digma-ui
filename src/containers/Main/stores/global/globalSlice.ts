import { createSlice } from "zustand-slices";
import {
  BackendInfo,
  DigmaStatus,
  Environment,
  InsightStats,
  PersistedState,
  RunConfiguration,
  Scope,
  UserInfo
} from "../../../../components/common/App/types";
import { isBoolean } from "../../../../typeGuards/isBoolean";
import { isEnvironment } from "../../../../typeGuards/isEnvironment";
import { isString } from "../../../../typeGuards/isString";

export interface GlobalState {
  digmaApiUrl: string | null;
  digmaApiProxyPrefix: string | null;
  digmaStatus: DigmaStatus | null;
  isDigmaEngineInstalled: boolean | null;
  isDigmaEngineRunning: boolean | null;
  isDockerInstalled: boolean | null;
  isDockerComposeInstalled: boolean | null;
  backendInfo: BackendInfo | null;
  jaegerURL: string | null;
  isJaegerEnabled: boolean | null;
  isMicrometerProject: boolean | null;
  runConfig: RunConfiguration | null;
  isObservabilityEnabled: boolean | null;
  productKey: string | null;
  isDigmathonModeEnabled: boolean | null;
  isDigmathonGameFinished: boolean | null;
  environment: Environment | null;
  environments: Environment[] | null;
  insightStats: InsightStats | null;
  userId: string | null;
  userInfo: UserInfo | null;
  userEmail: string | null;
  userRegistrationEmail: string | null;
  persistedState: PersistedState | null;
  selectedServices: string[] | null;
  scope: Scope | null;
}

const initialState: GlobalState = {
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
  insightStats: null,
  userId: isString(window.userId) ? window.userId : null,
  userInfo: null,
  userEmail: isString(window.userEmail) ? window.userEmail : null,
  userRegistrationEmail: isString(window.userRegistrationEmail)
    ? window.userRegistrationEmail
    : null,
  selectedServices: null,
  persistedState: null,
  scope: null
};

const set = (update: Partial<GlobalState>) => (state: GlobalState) => ({
  ...state,
  ...update
});

export const globalSlice = createSlice({
  name: "global",
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
    setInsightStats: (stats: InsightStats) => set({ insightStats: stats }),
    setUserId: (userId: string) => set({ userId }),
    setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
    setUserEmail: (email) => set({ userEmail: email }),
    setUserRegistrationEmail: (email: string) =>
      set({ userRegistrationEmail: email }),
    setPersistedState: (state: PersistedState) =>
      set({ persistedState: state }),
    setSelectedServices: (services: string[]) =>
      set({ selectedServices: services })
  }
});
