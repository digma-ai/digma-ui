import { getDurationString } from "../../../../utils/getDurationString";
import { TooltipContent } from "../TooltipContent";
import * as s from "./styles";
import { AreaTooltipContentProps } from "./types";

export const AreaTooltipContent = (
  props: AreaTooltipContentProps
): JSX.Element => (
  <TooltipContent>
    <s.Container>
      {[props.p95, props.p50].map((x) => (
        <s.Percentile key={x.percentile}>
          {x.label}
          <s.Value>{getDurationString(x.duration)}</s.Value>
        </s.Percentile>
      ))}
    </s.Container>
  </TooltipContent>
);
