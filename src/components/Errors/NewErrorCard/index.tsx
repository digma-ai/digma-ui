import { useMemo, useState } from "react";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../common/AffectedEndpointsSelector";
import { Option } from "../../common/AffectedEndpointsSelector/types";
import { TagType } from "../../common/v3/Tag/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { HIGH_SEVERITY_SCORE_THRESHOLD } from "../Score";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { NewErrorCardProps } from "./types";

const getStatusTagType = (status: string): TagType => {
  if (status === "High number of errors") {
    return "highSeverity";
  }

  if (status === "Escalating") {
    return "mediumSeverity";
  }

  if (status.includes("Recent")) {
    return "lowSeverity";
  }

  return "default";
};

export const NewErrorCard = ({
  data,
  onSourceLinkClick
}: NewErrorCardProps) => {
  const {
    id,
    affectedEndpoints,
    score,
    errorType,
    fromDisplayName,
    fromFullyQualifiedName,
    status
  } = data;
  const statusTagType = getStatusTagType(status);
  const selectorOptions = useMemo(
    () =>
      affectedEndpoints.map((x) => ({
        route: x.displayName,
        serviceName: x.service,
        spanCodeObjectId: x.spanCodeObjectId
      })),
    [affectedEndpoints]
  );
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    selectorOptions.length > 0 ? selectorOptions[0] : undefined
  );
  const isCritical = score.score > HIGH_SEVERITY_SCORE_THRESHOLD;

  const handleLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ERROR_CARD_SOURCE_LINK_CLICKED);
    onSourceLinkClick(id);
  };

  const handleAffectedEndpointsSelectorChange = (
    selectedOption: Option | null
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_SELECTED_AFFECTED_ENDPOINT_CHANGED
    );
    const newValue = selectedOption
      ? selectorOptions.find(
          (x) =>
            x.serviceName === selectedOption.serviceName &&
            x.spanCodeObjectId === selectedOption.spanCodeObjectId
        )
      : undefined;

    setSelectedEndpoint(newValue);
  };

  const handleAffectedEndpointLinkClick = (spanCodeObjectId: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_AFFECTED_ENDPOINT_LINK_CLICKED
    );
    changeScope({
      span: {
        spanCodeObjectId
      }
    });
  };

  const selectorValue = selectedEndpoint
    ? getEndpointKey(selectedEndpoint)
    : undefined;

  return (
    <s.Container $isCritical={isCritical}>
      <s.Header>
        <s.TitleContainer>
          <Tooltip title={errorType}>
            <s.Title>{errorType}</s.Title>
          </Tooltip>
          <Tooltip title={fromFullyQualifiedName ?? fromDisplayName}>
            <s.SourceLink onClick={handleLinkClick}>
              {fromDisplayName}
            </s.SourceLink>
          </Tooltip>
        </s.TitleContainer>
        <s.StatusTag content={status} title={status} type={statusTagType} />
      </s.Header>
      {selectorOptions.length > 0 && (
        <s.AffectedEndpointsContainer>
          Affected Endpoints ({selectorOptions.length})
          <AffectedEndpointsSelector
            onChange={handleAffectedEndpointsSelectorChange}
            onAssetLinkClick={handleAffectedEndpointLinkClick}
            value={selectorValue}
            options={selectorOptions}
          />
        </s.AffectedEndpointsContainer>
      )}
    </s.Container>
  );
};
