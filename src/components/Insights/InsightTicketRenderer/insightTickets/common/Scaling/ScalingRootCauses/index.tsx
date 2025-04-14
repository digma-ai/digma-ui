import * as s from "../styles";
import type { SpanScalingRootCausesProps as ScalingRootCausesProps } from "./types";

export const ScalingRootCauses = ({ spanInfos }: ScalingRootCausesProps) => {
  if (!spanInfos || spanInfos.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Root causes:</div>
      <s.List>
        {spanInfos.map((x) => (
          <li key={x.spanCodeObjectId}>{x.displayName}</li>
        ))}
      </s.List>
    </div>
  );
};
