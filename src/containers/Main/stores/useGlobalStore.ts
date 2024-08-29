import {
  BackendInfo,
  DigmaStatus,
  Environment,
  InsightStats,
  PersistedState,
  RunConfiguration,
  Scope,
  UserInfo
} from "../../../components/common/App/types";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isString } from "../../../typeGuards/isString";
import { useStore } from "./useStore";

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
  scope: Scope | null;
  insightStats: InsightStats | null;
  userId: string | null;
  userInfo: UserInfo | null;
  userEmail: string | null;
  userRegistrationEmail: string | null;
  persistedState: PersistedState | null;
  selectedServices: string[] | null;
}

export const initialState: GlobalState = {
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
  scope: null,
  insightStats: null,
  userId: isString(window.userId) ? window.userId : null,
  userInfo: null,
  userEmail: isString(window.userEmail) ? window.userEmail : null,
  userRegistrationEmail: isString(window.userRegistrationEmail)
    ? window.userRegistrationEmail
    : null,
  selectedServices: null,
  persistedState: null
};

export interface GlobalActions {
  setDigmaApiUrl: (url: string) => void;
  setDigmaApiProxyPrefix: (prefix: string) => void;
  setDigmaStatus: (status: DigmaStatus) => void;
  setIsDigmaEngineInstalled: (isInstalled: boolean) => void;
  setIsDigmaEngineRunning: (isRunning: boolean) => void;
  setIsDockerInstalled: (isInstalled: boolean) => void;
  setIsDockerComposeInstalled: (isInstalled: boolean) => void;
  setBackendInfo: (info: BackendInfo) => void;
  setJaegerURL: (url: string) => void;
  setIsJaegerEnabled: (isEnabled: boolean) => void;
  setIsMicrometerProject: (isMicrometer: boolean) => void;
  setRunConfig: (config: RunConfiguration) => void;
  setIsObservabilityEnabled: (isEnabled: boolean) => void;
  setProductKey: (key: string) => void;
  setIsDigmathonModeEnabled: (isEnabled: boolean) => void;
  setIsDigmathonGameFinished: (isFinished: boolean) => void;
  setEnvironment: (environment: Environment | null) => void;
  setEnvironments: (environments: Environment[]) => void;
  setScope: (scope: Scope) => void;
  setInsightStats: (stats: InsightStats) => void;
  setUserId: (userId: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  setUserEmail: (email: string) => void;
  setUserRegistrationEmail: (email: string) => void;
  setPersistedState: (state: PersistedState) => void;
  setSelectedServices: (services: string[]) => void;
  reset: () => void;
}

export const useGlobalStore = () => useStore((state) => state.global);
