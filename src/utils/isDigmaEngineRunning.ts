import { ConfigContextData } from "../components/common/App/types";

export const isDigmaEngineRunning = (config: ConfigContextData) =>
  Boolean(
    config.digmaStatus?.connection.status &&
      config.digmaStatus.runningDigmaInstances.length === 1 &&
      config.digmaStatus.runningDigmaInstances.includes("localEngine")
  );
