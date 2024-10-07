import {
  formatTimeDistance,
  getTimeDistance
} from "../../../../utils/formatTimeDistance";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { StatusProps } from "./types";

const getStatus = (lastSeen: Date) => {
  const interval = getTimeDistance(
    new Date().toISOString(),
    lastSeen.toISOString()
  );

  if (!interval) {
    return null;
  }

  if (
    (interval.value <= 5 && interval.unit === "minutes") ||
    interval.unit === "seconds"
  ) {
    return "live";
  }

  if (interval.value <= 59 && interval.unit === "minutes") {
    return "recent";
  }

  if (interval.value < 4 && interval.unit === "days") {
    return "active";
  }

  if (interval.value > 4 && interval.unit === "days" && interval.value < 7) {
    return "inactive";
  }

  return "stale";
};

export const Status = ({ firstSeen, lastSeen }: StatusProps) => {
  const status = getStatus(new Date(lastSeen));
  if (!status) {
    return null;
  }

  return (
    <Tooltip
      title={
        <s.InfoContainer>
          <s.Row>
            <s.Label>First seen:</s.Label>
            {formatTimeDistance(firstSeen, {
              format: "medium",
              withDescriptiveWords: true
            })}
          </s.Row>
          <s.Row>
            <s.Label>Last seen:</s.Label>
            {formatTimeDistance(lastSeen, {
              format: "medium",
              withDescriptiveWords: true
            })}
          </s.Row>
        </s.InfoContainer>
      }
    >
      <s.Container>
        <s.Indicator $status={status} />
        <s.Description>{status}</s.Description>
      </s.Container>
    </Tooltip>
  );
};
