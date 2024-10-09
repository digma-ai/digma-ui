import { useMemo, useState } from "react";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { Tooltip } from "../../common/v3/Tooltip";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../Insights/InsightsCatalog/InsightsPage/AffectedEndpointsSelector";
import { Option } from "../../Insights/InsightsCatalog/InsightsPage/AffectedEndpointsSelector/types";
import { HIGH_SEVERITY_SCORE_THRESHOLD } from "../Score";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { NewErrorCardProps } from "./types";

export const NewErrorCard = ({
  data,
  onSourceLinkClick
}: NewErrorCardProps) => {
  const { id, affectedEndpoints, score, errorType, fromDisplayName, status } =
    data;
  const selectorOptions = useMemo(
    () =>
      affectedEndpoints.map((x) => ({
        route: x.displayName,
        serviceName: x.service,
        spanCodeObjectId: x.spanCodeObjectId
      })),
    [affectedEndpoints]
  );
  const [selectedEndpoint, setSelectedEndpoint] = useState<Option | null>(
    selectorOptions.length > 0 ? selectorOptions[0] : null
  );
  const isCritical = score.score > HIGH_SEVERITY_SCORE_THRESHOLD;

  const handleLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ERROR_CARD_SOURCE_LINK_CLICKED);
    onSourceLinkClick(id);
  };

  const handleAffectedEndpointChange = (selectedOption: Option | null) => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_SELECTED_AFFECTED_ENDPOINT_CHANGED
    );
    const selected = selectedOption
      ? selectorOptions.find(
          (x) => getEndpointKey(x) === getEndpointKey(selectedOption)
        )
      : null;

    const newValue = selected ?? null;

    setSelectedEndpoint(newValue);
  };

  const handleAffectedEndpointLinkClick = (spanCodeObjectId: string) => {
    // TODO: add custom event?
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_AFFECTED_ENDPOINT_LINK_CLICKED
    );
    changeScope({
      span: {
        spanCodeObjectId
      }
    });
  };

  const selectValue = selectedEndpoint
    ? getEndpointKey(selectedEndpoint)
    : undefined;

  return (
    <s.Container $isCritical={isCritical}>
      <s.Header>
        <s.TitleContainer>
          <Tooltip title={errorType}>
            <s.Title>{errorType}</s.Title>
          </Tooltip>
          <Tooltip title={fromDisplayName}>
            <s.SourceLink onClick={handleLinkClick}>
              {fromDisplayName}
            </s.SourceLink>
          </Tooltip>
        </s.TitleContainer>
        <s.StatusTag content={status} title={status} />
      </s.Header>
      {selectorOptions.length > 0 && (
        <s.AffectedEndpointsContainer>
          Affected Endpoints ({selectorOptions.length})
          <AffectedEndpointsSelector
            onChange={handleAffectedEndpointChange}
            onAssetLinkClick={handleAffectedEndpointLinkClick}
            value={selectValue}
            options={selectorOptions}
          />
        </s.AffectedEndpointsContainer>
      )}
    </s.Container>
  );
};
