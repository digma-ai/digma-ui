import { DELIMITER } from "../../../../../constants";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import * as s from "./styles";
import type { QueryOptimizationEndpointsProps } from "./types";

export const QueryOptimizationEndpoints = ({
  insight
}: QueryOptimizationEndpointsProps) => {
  if (!insight) {
    return null;
  }

  const endpoints = insight.endpoints ?? [];

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Affected endpoints:</div>
      <s.List>
        {endpoints.map((x) => {
          const key = [x.endpointInfo.serviceName, x.endpointInfo.route].join(
            DELIMITER
          );

          return (
            <li key={key}>
              <div>
                {x.endpointInfo.serviceName}{" "}
                {trimEndpointScheme(x.endpointInfo.route)}
              </div>
            </li>
          );
        })}
      </s.List>
    </div>
  );
};
