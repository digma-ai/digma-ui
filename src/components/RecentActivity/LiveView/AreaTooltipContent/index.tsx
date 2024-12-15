import { getDurationString } from "../../../../utils/getDurationString";
import { TooltipContent } from "../TooltipContent";
import * as s from "./styles";
import type { AreaTooltipContentProps } from "./types";

export const AreaTooltipContent = ({ p50, p95 }: AreaTooltipContentProps) => (
  <TooltipContent>
    <s.Container>
      {[p95, p50].map((x) => (
        <s.Percentile key={x.percentile}>
          {x.label}
          <s.Value>{getDurationString(x.duration)}</s.Value>
        </s.Percentile>
      ))}
    </s.Container>
  </TooltipContent>
);
