import { getDurationString } from "../../../../../utils/getDurationString";
import { roundTo } from "../../../../../utils/roundTo";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import * as s from "./styles";
import type { BottleneckEndpointsProps } from "./types";

export const BottleneckEndpoints = ({ insight }: BottleneckEndpointsProps) => {
  if (!insight) {
    return null;
  }

  const endpoints = insight.slowEndpoints ?? [];

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        The span {insight.spanInfo?.displayName ?? ""} is slowing down the
        following endpoints:
      </div>
      <s.List>
        {endpoints.map((x) => (
          <li key={x.endpointInfo.route}>
            <div>
              {x.endpointInfo.serviceName}{" "}
              {trimEndpointScheme(x.endpointInfo.route)}
            </div>
            <div>
              Slowing {roundTo(x.probabilityOfBeingBottleneck * 100, 2)}% of the
              requests (~{getDurationString(x.avgDurationWhenBeingBottleneck)})
            </div>
          </li>
        ))}
      </s.List>
    </div>
  );
};
