import { format } from "date-fns";
import type {
  GetIncidentResponse,
  IncidentResponseItem
} from "../../../../redux/services/types";
import { Tooltip } from "../../../common/v3/Tooltip";
import { Divider } from "./Divider";
import * as s from "./styles";

const mockData: IncidentResponseItem &
  GetIncidentResponse & { affectedServices: string[] } = {
  id: "incident-123",
  name: "Sample Incident",
  active_status: "active",
  status: "active",
  created_at: "2023-10-01T12:00:00Z",
  closed_at: "2023-10-01T12:30:00Z",
  affectedServices: ["service-1", "service-2", "service-3", "service-4"],
  summary: "This is a summary of the incident."
};

const DATE_FORMAT = "dd MMM, yyyy";
const SERVICE_TAGS_TO_SHOW = 2;

export const IncidentMetaData = () => {
  const hiddenServices = mockData.affectedServices.slice(SERVICE_TAGS_TO_SHOW);

  return (
    <s.Container>
      <s.DateAttribute>
        <s.DateLabel>Incident start time:</s.DateLabel>
        <Tooltip title={new Date(mockData.created_at).toString()}>
          <s.DateValue>{format(mockData.created_at, DATE_FORMAT)}</s.DateValue>
        </Tooltip>
      </s.DateAttribute>
      <s.DividerContainer>
        <Divider color={"currentColor"} />
      </s.DividerContainer>
      <s.DateAttribute>
        <s.DateLabel>Incident close time:</s.DateLabel>
        {mockData.closed_at && (
          <Tooltip title={new Date(mockData.closed_at).toString()}>
            <s.DateValue>{format(mockData.closed_at, DATE_FORMAT)}</s.DateValue>
          </Tooltip>
        )}
      </s.DateAttribute>
      <s.DividerContainer>
        <Divider color={"currentColor"} />
      </s.DividerContainer>
      <s.ServicesContainer>
        <span>Affected services:</span>
        {mockData.affectedServices.slice(0, 2).map((x) => (
          <Tooltip key={x} title={x}>
            <s.ServiceTag>{x}</s.ServiceTag>
          </Tooltip>
        ))}
        {hiddenServices.length > 0 && (
          <Tooltip title={hiddenServices.join(", ")}>
            <s.HiddenServicesCountTag>
              +{hiddenServices.length}
            </s.HiddenServicesCountTag>
          </Tooltip>
        )}
      </s.ServicesContainer>
    </s.Container>
  );
};
