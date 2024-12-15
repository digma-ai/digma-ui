import { DELIMITER } from "../../../../../../constants";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import * as s from "../styles";
import type { ScalingIssueCommonProps } from "../types";

export const ScalingIssueAffectedEndpoints = ({
  insight
}: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  const endpoints = insight.affectedEndpoints ?? [];

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Affected endpoints:</div>
      <s.List>
        {endpoints.map((x) => {
          const key = [x.serviceName, x.route].join(DELIMITER);

          return (
            <li key={key}>
              <div>
                {x.serviceName} {trimEndpointScheme(x.route)}
              </div>
            </li>
          );
        })}
      </s.List>
    </div>
  );
};
