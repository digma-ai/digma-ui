import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { FeatureFlag } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../common/AffectedEndpointsSelector";
import { Option } from "../../common/AffectedEndpointsSelector/types";
import { DismissPanel } from "../../common/DismissPanel";
import { HistogramIcon } from "../../common/icons/16px/HistogramIcon";
import { PinFillIcon } from "../../common/icons/16px/PinFillIcon";
import { PinIcon } from "../../common/icons/16px/PinIcon";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { actions } from "../actions";
import { TimestampKeyValue } from "../ErrorCard/TimestampKeyValue";
import { getTagType, HIGH_SEVERITY_SCORE_THRESHOLD } from "../Score";
import { trackingEvents } from "../tracking";
import { useDismissal } from "./hooks/useDismissal";
import { OccurrenceChart } from "./OccurrenceChart";
import * as s from "./styles";
import { NewErrorCardProps, PinErrorPayload, UnpinErrorPayload } from "./types";

export const getStatusString = (status: string) =>
  status.toLowerCase().startsWith("recent") ? "Recent" : status;

export const NewErrorCard = ({
  data,
  onSourceLinkClick
}: NewErrorCardProps) => {
  const [isHistogramVisible, setIsHistogramVisible] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { environment, backendInfo } = useConfigSelector();

  const isOccurrenceChartEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_ERROR_OCCURRENCE_CHART_ENABLED
  );

  const isPinEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_GLOBAL_ERROR_PIN_ENABLED
  );

  const isDismissEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_GLOBAL_ERROR_DISMISS_ENABLED
  );

  const {
    id,
    affectedEndpoints,
    score,
    errorType,
    fromDisplayName,
    fromFullyQualifiedName,
    status,
    firstDetected,
    lastDetected,
    isDismissed
  } = data;
  const statusTagType = getTagType(score.score);
  const { isDismissalChangeInProgress, dismiss, show } = useDismissal(id);
  const selectorOptions: Option[] = useMemo(
    () =>
      affectedEndpoints.map((x) => ({
        route: x.displayName,
        serviceName: x.service,
        spanCodeObjectId: x.spanCodeObjectId
      })),
    [affectedEndpoints]
  );
  const [selectedEndpoint, setSelectedEndpoint] = useState<Option | undefined>(
    selectorOptions[0]
  );

  useEffect(() => {
    if (
      selectedEndpoint &&
      !selectorOptions.find(
        (x) => getEndpointKey(x) === getEndpointKey(selectedEndpoint)
      )
    ) {
      setSelectedEndpoint(selectorOptions[0]);
    }
  }, [selectorOptions, selectedEndpoint]);

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

  const handleHistogramButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_HISTOGRAM_BUTTON_CLICKED
    );
    setIsHistogramVisible(!isHistogramVisible);
  };

  const handlePinUnpinButtonClick = () => {
    const value = !data.pinnedAt;
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_PIN_UNPIN_BUTTON_CLICKED,
      {
        value
      }
    );

    if (!environment) {
      return;
    }

    if (value) {
      window.sendMessageToDigma<PinErrorPayload>({
        action: actions.PIN_ERROR,
        payload: {
          id,
          environment: environment.id
        }
      });
    } else {
      window.sendMessageToDigma<UnpinErrorPayload>({
        action: actions.UNPIN_ERROR,
        payload: {
          id,
          environment: environment.id
        }
      });
    }
  };

  const handleDismissalButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_DISMISS_BUTTON_CLICKED
    );
    dismiss();
  };

  const handleUndismissalButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_PIN_UNDISMISS_BUTTON_CLICKED
    );
    show();
  };

  const isCritical = score.score > HIGH_SEVERITY_SCORE_THRESHOLD;
  const isPinned = Boolean(data.pinnedAt);

  const selectorValue = selectedEndpoint
    ? getEndpointKey(selectedEndpoint)
    : undefined;

  const toolbarActions = [
    ...(isPinEnabled
      ? [
          <NewIconButton
            key={"pin-unpin"}
            isHighlighted={isPinned}
            buttonType={"secondaryBorderless"}
            icon={isPinned ? PinFillIcon : PinIcon}
            onClick={handlePinUnpinButtonClick}
          />
        ]
      : []),
    ...(isOccurrenceChartEnabled && selectedEndpoint
      ? [
          <NewIconButton
            key={"toggle-occurrence-chart"}
            isHighlighted={isHistogramVisible}
            buttonType={"secondaryBorderless"}
            icon={HistogramIcon}
            onClick={handleHistogramButtonClick}
          />
        ]
      : [])
  ];

  return (
    <s.Container $isCritical={isCritical} $isPinned={isPinned}>
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
        {status && (
          <s.StatusTag
            content={getStatusString(status)}
            title={
              <s.StatusTagTooltipContainer>
                <span>Score: {score.score}</span>
                <TimestampKeyValue
                  key={"first-detected"}
                  label={"First detected"}
                  timestamp={firstDetected}
                />
                <TimestampKeyValue
                  key={"last-seen"}
                  label={"Last seen"}
                  timestamp={lastDetected}
                />
              </s.StatusTagTooltipContainer>
            }
            type={statusTagType}
          />
        )}
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
      {isOccurrenceChartEnabled && selectedEndpoint && (
        <>
          <CSSTransition
            in={isHistogramVisible}
            timeout={s.TRANSITION_DURATION}
            classNames={s.chartContainerTransitionClassName}
            nodeRef={chartContainerRef}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <s.OccurrenceChartContainer
              ref={chartContainerRef}
              $transitionClassName={s.chartContainerTransitionClassName}
              $transitionDuration={s.TRANSITION_DURATION}
            >
              <OccurrenceChart
                service={selectedEndpoint.serviceName}
                spanCodeObjectId={selectedEndpoint.spanCodeObjectId}
                errorId={id}
              />
            </s.OccurrenceChartContainer>
          </CSSTransition>
        </>
      )}
      {toolbarActions.length > 0 && (
        <s.Footer>
          {isDismissEnabled && (
            <DismissPanel
              confirmationMessage="Dismiss error?"
              onShow={handleUndismissalButtonClick}
              onDismiss={handleDismissalButtonClick}
              state={
                isDismissalChangeInProgress
                  ? "in-progress"
                  : isDismissed
                  ? "dismissed"
                  : "visible"
              }
            />
          )}
          {toolbarActions}
        </s.Footer>
      )}
    </s.Container>
  );
};
