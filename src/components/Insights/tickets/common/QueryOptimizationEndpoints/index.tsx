import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import * as s from "./styles";
import { QueryOptimizationEndpointsProps } from "./types";

export const QueryOptimizationEndpoints = (
  props: QueryOptimizationEndpointsProps
) => {
  if (!props.insight) {
    return null;
  }

  const endpoints = props.insight.endpoints || [];

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Affected endpoints:</div>
      <s.List>
        {endpoints.map((x) => (
          <li key={x.endpointInfo.route}>
            <div>
              {x.endpointInfo.serviceName}{" "}
              {trimEndpointScheme(x.endpointInfo.route)}
            </div>
          </li>
        ))}
      </s.List>
    </div>
  );
};
