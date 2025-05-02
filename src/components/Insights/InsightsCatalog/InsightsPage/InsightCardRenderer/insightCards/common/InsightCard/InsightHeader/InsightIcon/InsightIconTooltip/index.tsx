import { isNumber } from "../../../../../../../../../../../typeGuards/isNumber";
import { intersperse } from "../../../../../../../../../../../utils/intersperse";
import { roundTo } from "../../../../../../../../../../../utils/roundTo";
import { getValueLabel } from "../getValueLabel";
import { GradientProgressBar } from "../GradientProgressBar";
import * as s from "./styles";
import type { InsightIconTooltipProps, Metric } from "./types";

export const InsightIconTooltip = ({
  severity,
  impact,
  criticality
}: InsightIconTooltipProps) => {
  const metrics = [
    { label: "Severity", value: severity },
    { label: "Impact", value: impact },
    { label: "Criticality", value: criticality }
  ].filter((metric) => isNumber(metric.value)) as Metric[];

  return (
    <s.TitleContainer>
      {intersperse(
        metrics.map(({ label, value }) => (
          <GradientProgressBar
            key={label}
            label={label}
            value={roundTo(value * 100, 0)}
            valueLabel={getValueLabel(value)}
          />
        )),
        (i) => (
          <s.Divider key={`separator-${i}`} />
        )
      )}
    </s.TitleContainer>
  );
};
