import { DELIMITER } from "../../../../../constants";
import { getCriticalityLabel } from "../../../../../utils/getCriticalityLabel";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import * as s from "./styles";
import type { NPlusOneEndpointsProps } from "./types";

export const NPlusOneEndpoints = ({ insight }: NPlusOneEndpointsProps) => {
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
              <div>
                Repeats: {x.occurrences}{" "}
                {x.criticality > 0
                  ? `Criticality: ${getCriticalityLabel(x.criticality)}`
                  : ""}
              </div>
            </li>
          );
        })}
      </s.List>
    </div>
  );
};
