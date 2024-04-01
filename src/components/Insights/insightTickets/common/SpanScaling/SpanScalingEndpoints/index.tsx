import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import * as s from "../styles";
import { ScalingIssueCommonProps } from "../types";

export const ScalingIssueAffectedEndpoints = ({
  insight
}: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  const endpoints = insight.affectedEndpoints || [];

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Affected endpoints:</div>
      <s.List>
        {endpoints.map((x) => (
          <li key={x.route}>
            <div>
              {x.serviceName} {trimEndpointScheme(x.route)}
            </div>
          </li>
        ))}
      </s.List>
    </div>
  );
};
