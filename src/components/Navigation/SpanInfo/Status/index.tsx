import { formatUnit } from "../../../../utils/formatUnit";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { StatusProps } from "./types";

const timeAgo = ({ minutes = 0, days = 0, weeks = 0 }) => {
  const now = new Date();

  const interval = minutes + (days + weeks * 7) * 24 * 60;
  return new Date(now.getTime() - interval * 60 * 1000);
};

const toPastTime = (date: string) => {
  const now = new Date();
  const secondsAgo =
    Math.floor(now.getTime() - new Date(date).getTime()) / 1000;
  let interval = Math.floor(secondsAgo / (60 * 60 * 24 * 7));
  if (interval >= 1) {
    return interval + formatUnit(interval, " week") + " ago";
  }

  interval = Math.floor(secondsAgo / (60 * 60 * 24));
  if (interval >= 1) {
    return interval + formatUnit(interval, " day") + " ago";
  }

  interval = Math.floor(secondsAgo / (60 * 60));
  if (interval >= 1) {
    return interval + formatUnit(interval, " hour") + " ago";
  }

  interval = Math.floor(secondsAgo / 60);
  if (interval >= 1) {
    return interval + formatUnit(interval, " minute") + " ago";
  }

  return "1 minute ago";
};

const getStatus = (lastSeen: Date) => {
  if (lastSeen >= timeAgo({ minutes: 5 })) {
    return "live";
  }

  if (lastSeen >= timeAgo({ minutes: 60 })) {
    return "recent";
  }

  if (lastSeen >= timeAgo({ days: 4 })) {
    return "active";
  }

  if (lastSeen <= timeAgo({ days: 4 }) && lastSeen >= timeAgo({ weeks: 1 })) {
    return "inactive";
  }

  if (lastSeen <= timeAgo({ weeks: 1 })) {
    return "stale";
  }

  return null;
};

export const Status = ({ firstSeen, lastSeen }: StatusProps) => {
  const status = getStatus(new Date(lastSeen));
  if (!status) {
    return <></>;
  }

  return (
    <Tooltip
      title={
        <s.InfoContainer>
          <s.Row>
            <s.Label>First seen:</s.Label>
            {toPastTime(firstSeen)}
          </s.Row>
          <s.Row>
            <s.Label>Last seen:</s.Label>
            {toPastTime(lastSeen)}
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
