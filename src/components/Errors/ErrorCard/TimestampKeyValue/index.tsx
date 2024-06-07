import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { TimestampProps } from "./types";

export const TimestampKeyValue = ({ label, timestamp }: TimestampProps) => {
  const dateTimeString = new Date(timestamp).toString();

  return (
    <Tooltip title={dateTimeString} key={label}>
      <s.Container>
        <s.Label>{label}:</s.Label>
        <s.TimeDistance>{formatTimeDistance(timestamp)}</s.TimeDistance>
      </s.Container>
    </Tooltip>
  );
};
