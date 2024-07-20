import { DigmaStatus } from "../components/common/App/types";

export const isDigmaEngineRunning = (digmaStatus: DigmaStatus | null) =>
  Boolean(
    digmaStatus?.connection.status &&
      digmaStatus.runningDigmaInstances.length === 1 &&
      digmaStatus.runningDigmaInstances.includes("localEngine")
  );
