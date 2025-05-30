import { format } from "date-fns";
import { useMemo } from "react";
import { useParams } from "react-router";
import { useGetIncidentQuery } from "../../../../redux/services/digma";
import { Tooltip } from "../../../common/v3/Tooltip";
import { Divider } from "./Divider";
import * as s from "./styles";

// TODO: move to Storybook
// const mockData: GetIncidentResponse = {
//   id: "incident-123",
//   name: "Sample Incident",
//   activeStatus: "active",
//   status: "active",
//   createdAt: "2023-10-01T12:00:00Z",
//   closedAt: "2023-10-01T12:30:00Z",
//   affectedServices: ["service-1", "service-2", "service-3", "service-4"],
//   summary: "This is a summary of the incident.",
//   relatedIssues: [
//     {
//       issueId: "issue-1",
//       type: "issue",
//       spanUid: null,
//       criticality: 0.2
//     },
//     {
//       issueId: "issue-2",
//       type: "issue",
//       spanUid: null,
//       criticality: 1
//     }
//   ]
// };

const DATE_FORMAT = "dd MMM, yyyy";
const SERVICE_TAGS_TO_SHOW = 2;
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const IncidentMetaData = () => {
  const params = useParams();
  const incidentId = params.id;

  const { data } = useGetIncidentQuery(
    { id: incidentId ?? "" },
    {
      skip: !incidentId,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const hiddenServices = useMemo(
    () => data?.affected_services.slice(SERVICE_TAGS_TO_SHOW) ?? [],
    [data]
  );

  const serviceTagsToShow = useMemo(
    () => data?.affected_services.slice(0, SERVICE_TAGS_TO_SHOW) ?? [],
    [data]
  );

  if (!data) {
    return null;
  }

  return (
    <s.Container>
      <s.DateAttribute>
        <s.DateLabel>Incident start time:</s.DateLabel>
        <Tooltip title={new Date(data.created_at).toString()}>
          <s.DateValue>{format(data.created_at, DATE_FORMAT)}</s.DateValue>
        </Tooltip>
      </s.DateAttribute>
      <s.DividerContainer>
        <Divider color={"currentColor"} />
      </s.DividerContainer>
      <s.DateAttribute>
        <s.DateLabel>Incident close time:</s.DateLabel>
        {data.closed_at && (
          <Tooltip title={new Date(data.closed_at).toString()}>
            <s.DateValue>{format(data.closed_at, DATE_FORMAT)}</s.DateValue>
          </Tooltip>
        )}
      </s.DateAttribute>
      {data.affected_services.length > 0 && (
        <>
          <s.DividerContainer>
            <Divider color={"currentColor"} />
          </s.DividerContainer>
          <s.ServicesContainer>
            <span>Affected services:</span>
            {serviceTagsToShow.map((x) => (
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
        </>
      )}
    </s.Container>
  );
};
