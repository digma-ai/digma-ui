import { format } from "date-fns";
import { useMemo } from "react";
import { useParams } from "react-router";
import { useAgenticDispatch } from "../../../../containers/Agentic/hooks";
import { useGetIncidentQuery } from "../../../../redux/services/digma";
import { setIncidentToClose } from "../../../../redux/slices/incidentsSlice";
import { Tooltip } from "../../../common/v3/Tooltip";
import { Divider } from "./Divider";
import * as s from "./styles";

const DATE_FORMAT = "dd MMM, yyyy HH:mm";
const SERVICE_TAGS_TO_SHOW = 2;
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const IncidentMetaData = () => {
  const params = useParams();
  const incidentId = params.id;
  const dispatch = useAgenticDispatch();

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

  const handleCloseButtonClick = () => {
    if (!incidentId) {
      return;
    }

    dispatch(setIncidentToClose(incidentId));
  };

  if (!data) {
    return <s.Container />;
  }

  return (
    <s.Container>
      {data.status_timestamps.active && (
        <s.DateAttribute>
          <s.DateLabel>Incident start time:</s.DateLabel>
          <Tooltip title={new Date(data.status_timestamps.active).toString()}>
            <s.DateValue>
              {format(data.status_timestamps.active, DATE_FORMAT)}
            </s.DateValue>
          </Tooltip>
        </s.DateAttribute>
      )}
      {data.status_timestamps.closed && (
        <>
          <s.DividerContainer>
            <Divider color={"currentColor"} />
          </s.DividerContainer>
          <s.DateAttribute>
            <s.DateLabel>Incident close time:</s.DateLabel>
            <Tooltip title={new Date(data.status_timestamps.closed).toString()}>
              <s.DateValue>
                {format(data.status_timestamps.closed, DATE_FORMAT)}
              </s.DateValue>
            </Tooltip>
          </s.DateAttribute>
        </>
      )}
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
      {data.status === "pending" && (
        <s.CloseIncidentButton
          label={"Close incident"}
          onClick={handleCloseButtonClick}
        />
      )}
    </s.Container>
  );
};
