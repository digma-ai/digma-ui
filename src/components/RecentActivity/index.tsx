import { useState } from "react";
import { groupBy } from "../../utils/groupBy";
import { EnvironmentPanel } from "../EnvironmentPanel";
import { RecentActivityTable } from "../RecentActivityTable";
import { data } from "./data";
import { ActivityEntry } from "./types";

const isRecent = (entry: ActivityEntry): boolean => {
  const MAX_DISTANCE = 10 * 60 * 1000; // in milliseconds
  const now = new Date();
  return (
    now.valueOf() - new Date(entry.latestTraceTimestamp).valueOf() <=
    MAX_DISTANCE
  );
};

export const RecentActivity = () => {
  const envActivities = groupBy(data.entries, "environment");
  const envs = Object.keys(envActivities).map((env) => ({
    name: env,
    hasBadge: envActivities[env].some(isRecent)
  }));
  const [selectedEnv, setSelectedEnv] = useState(envs[0].name);

  const handleEnvSelect = (env: string) => {
    setSelectedEnv(env);
  };
  return (
    <div>
      <EnvironmentPanel
        envs={envs}
        selectedEnv={selectedEnv}
        onEnvSelect={handleEnvSelect}
      />
      <RecentActivityTable data={envActivities[selectedEnv]} />
    </div>
  );
};
