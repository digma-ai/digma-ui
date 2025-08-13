import { IncidentSummaryRecord } from "./IncidentSummaryRecord";
import * as s from "./styles";
import type { IncidentSummaryProps } from "./types";

export const IncidentSummary = ({ records }: IncidentSummaryProps) => (
  <s.Container>
    {records.map((record) => (
      <IncidentSummaryRecord
        key={record.id}
        agent={record.agent_display_name}
        datetime={record.timestamp}
        text={record.text}
      />
    ))}
  </s.Container>
);
