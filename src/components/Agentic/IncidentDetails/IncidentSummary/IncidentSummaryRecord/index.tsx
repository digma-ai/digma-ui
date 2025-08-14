import { format } from "date-fns";
import * as s from "./styles";
import type { IncidentSummaryRecordProps } from "./types";

export const IncidentSummaryRecord = ({
  agent,
  datetime,
  text
}: IncidentSummaryRecordProps) => (
  <s.Container>
    <s.Header>
      <s.Agent>{agent}</s.Agent>
      <s.DateTime>{format(datetime, "h:mm a, LLLL d y")}</s.DateTime>
    </s.Header>
    <s.Text>{text}</s.Text>
  </s.Container>
);
