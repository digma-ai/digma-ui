import { useNow } from "../../../../hooks/useNow";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import type { TimestampProps } from "./types";

export const TimestampKeyValue = ({ label, timestamp }: TimestampProps) => {
  const dateTimeString = new Date(timestamp).toString();
  const now = useNow();

  return (
    <Tooltip title={dateTimeString} key={label}>
      <s.Container>
        <s.Label>{label}:</s.Label>
        <s.TimeDistance>{formatTimeDistance(timestamp, now)}</s.TimeDistance>
      </s.Container>
    </Tooltip>
  );
};
