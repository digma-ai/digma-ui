import { getDurationString } from "../../../../../utils/getDurationString";
import { roundTo } from "../../../../../utils/roundTo";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import * as s from "./styles";
import { BottleneckEndpointsProps } from "./types";

export const BottleneckEndpoints = (props: BottleneckEndpointsProps) => {
  if (!props.insight) {
    return null;
  }

  const endpoints = props.insight.slowEndpoints;

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        The span {props.insight.spanInfo?.displayName || ""} is slowing down the
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
