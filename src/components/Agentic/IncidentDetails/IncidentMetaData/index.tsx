import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useAgenticDispatch } from "../../../../containers/Agentic/hooks";
import { useGetIncidentQuery } from "../../../../redux/services/digma";
import {
  setIncidentToCancel,
  setIncidentToClose,
  setIncidentToDelete,
  setStatusDetails
} from "../../../../redux/slices/incidentsSlice";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { intersperse } from "../../../../utils/intersperse";
import { InfoCircleIcon } from "../../../common/icons/InfoCircleIcon";
import { NewButton } from "../../../common/v3/NewButton";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { Tooltip } from "../../../common/v3/Tooltip";
import { trackingEvents } from "../../tracking";
import { Divider } from "./Divider";
import { IdeToolbar } from "./IdeToolbar";
import * as s from "./styles";

const DATE_FORMAT = "dd MMM, yyyy HH:mm";
const SERVICE_TAGS_TO_SHOW = 2;
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const IncidentMetaData = () => {
  const params = useParams();
  const incidentId = params.id;
  const dispatch = useAgenticDispatch();
  const [isIncidentNotFound, setIsIncidentNotFound] = useState(false);

  const { data, error } = useGetIncidentQuery(
    { id: incidentId ?? "" },
    {
      skip: !incidentId,
      pollingInterval: isIncidentNotFound ? 0 : REFRESH_INTERVAL
    }
  );

  const currentStatusData = data?.status_details[data?.status];

  const hiddenServices = useMemo(
    () => data?.affected_services.slice(SERVICE_TAGS_TO_SHOW) ?? [],
    [data]
  );

  const serviceTagsToShow = useMemo(
    () => data?.affected_services.slice(0, SERVICE_TAGS_TO_SHOW) ?? [],
    [data]
  );

  const handleInfoButtonClick = () => {
    if (!data || !currentStatusData?.status_info) {
      return;
    }

    dispatch(
      setStatusDetails({
        status: data.status,
        info: currentStatusData.status_info
      })
    );
  };

  const handleCancelButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.INCIDENT_CANCEL_BUTTON_CLICKED);
    if (!incidentId) {
      return;
    }

    dispatch(setIncidentToCancel(incidentId));
  };

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.INCIDENT_CLOSE_BUTTON_CLICKED);
    if (!incidentId) {
      return;
    }

    dispatch(setIncidentToClose(incidentId));
  };

  const handleDeleteButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.INCIDENT_DELETE_BUTTON_CLICKED);
    if (!incidentId) {
      return;
    }

    dispatch(setIncidentToDelete(incidentId));
  };

  useEffect(() => {
    setIsIncidentNotFound(false);
  }, [incidentId]);

  useEffect(() => {
    if (error && "status" in error && error.status === 404) {
      setIsIncidentNotFound(true);
    }
  }, [error]);

  if (!data) {
    return <s.Container />;
  }

  const attributes = intersperse(
    [
      ...(data.status_details.active
        ? [
            <s.Attribute key={"start-time"}>
              <s.AttributeLabel>Incident start time:</s.AttributeLabel>
              <Tooltip
                title={new Date(
                  data.status_details.active.timestamp
                ).toString()}
              >
                <s.AttributeValue>
                  {format(data.status_details.active.timestamp, DATE_FORMAT)}
                </s.AttributeValue>
              </Tooltip>
            </s.Attribute>
          ]
        : []),
      ...(data.status_details.closed
        ? [
            <s.Attribute key={"close-time"}>
              <s.AttributeLabel>Incident close time:</s.AttributeLabel>
              <Tooltip
                title={new Date(
                  data.status_details.closed.timestamp
                ).toString()}
              >
                <s.AttributeValue>
                  {format(data.status_details.closed.timestamp, DATE_FORMAT)}
                </s.AttributeValue>
              </Tooltip>
            </s.Attribute>
          ]
        : []),
      ...(data.status_details.error
        ? [
            <s.Attribute key={"error-time"}>
              <s.AttributeLabel>Incident error time:</s.AttributeLabel>
              <Tooltip
                title={new Date(data.status_details.error.timestamp).toString()}
              >
                <s.AttributeValue>
                  {format(data.status_details.error.timestamp, DATE_FORMAT)}
                </s.AttributeValue>
              </Tooltip>
            </s.Attribute>
          ]
        : []),
      ...(data.affected_services.length > 0
        ? [
            <s.ServicesContainer key={"affected-services"}>
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
          ]
        : []),
      <s.Attribute key={"status"}>
        <s.AttributeLabel>Status:</s.AttributeLabel>
        <s.StatusAttributeValue>{data.status}</s.StatusAttributeValue>
        {currentStatusData?.status_info && (
          <Tooltip title={"Additional details"}>
            <NewIconButton
              icon={InfoCircleIcon}
              onClick={handleInfoButtonClick}
              buttonType={"secondaryBorderless"}
              size={"large"}
            />
          </Tooltip>
        )}
      </s.Attribute>
    ],
    (i) => (
      <s.DividerContainer key={`separator-${i}`}>
        <Divider color={"currentColor"} />
      </s.DividerContainer>
    )
  );

  return (
    <s.Container>
      <s.AttributesList>{attributes}</s.AttributesList>
      <s.Toolbar>
        {incidentId && <IdeToolbar incidentId={incidentId} />}
        {data.status === "active" && (
          <NewButton
            label={"Cancel incident"}
            onClick={handleCancelButtonClick}
          />
        )}
        {data.status === "pending" && (
          <NewButton
            label={"Close incident"}
            onClick={handleCloseButtonClick}
          />
        )}
        {["error", "closed", "canceled"].includes(data.status) && (
          <NewButton
            label={"Delete incident"}
            onClick={handleDeleteButtonClick}
          />
        )}
      </s.Toolbar>
    </s.Container>
  );
};
