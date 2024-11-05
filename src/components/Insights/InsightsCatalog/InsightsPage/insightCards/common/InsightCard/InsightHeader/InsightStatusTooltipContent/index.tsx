import { InsightStatus } from "../../../../../../../types";
import { KeyValue } from "./KeyValue";
import { TimestampKeyValue } from "./TimestampKeyValue";
import * as s from "./styles";
import { InsightStatusTooltipContentProps } from "./types";

export const InsightStatusTooltipContent = ({
  insight
}: InsightStatusTooltipContentProps): JSX.Element | null => {
  switch (insight.status) {
    case InsightStatus.Active:
      return (
        <s.Container>
          <TimestampKeyValue key={"first-detected"} label={"First detected"}>
            {insight.firstDetected}
          </TimestampKeyValue>
          <TimestampKeyValue key={"last-seen"} label={"Last seen"}>
            {insight.lastDetected}
          </TimestampKeyValue>
        </s.Container>
      );
    case InsightStatus.PossiblyFixed:
      return (
        <s.Container>
          <TimestampKeyValue key={"first-detected"} label={"First detected"}>
            {insight.firstDetected}
          </TimestampKeyValue>
          <TimestampKeyValue
            key={"first-fixed"}
            label={"First identified as fixed"}
          >
            {insight.firstFixed}
          </TimestampKeyValue>
        </s.Container>
      );
    case InsightStatus.Regression:
      return (
        <s.Container>
          <TimestampKeyValue key={"first-detected"} label={"First detected"}>
            {insight.firstDetected}
          </TimestampKeyValue>
          <TimestampKeyValue key={"last-seen"} label={"Last seen"}>
            {insight.lastDetected}
          </TimestampKeyValue>
          <TimestampKeyValue key={"last-fixed"} label={"Last fixed"}>
            {insight.lastDeactivated}
          </TimestampKeyValue>
          <TimestampKeyValue key={"last-reopen"} label={"Last reopened"}>
            {insight.lastReopen}
          </TimestampKeyValue>
          <KeyValue label={"Reopen count"}>{insight.reopenCount}</KeyValue>
        </s.Container>
      );
    default:
      return null;
  }
};
