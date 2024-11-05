import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { FeatureFlag } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../common/AffectedEndpointsSelector";
import { Option } from "../../common/AffectedEndpointsSelector/types";
import { HistogramIcon } from "../../common/icons/16px/HistogramIcon";
import { PinFillIcon } from "../../common/icons/16px/PinFillIcon";
import { PinIcon } from "../../common/icons/16px/PinIcon";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { TimestampKeyValue } from "../ErrorCard/TimestampKeyValue";
import { usePinning } from "../GlobalErrorsList/usePinning";
import { getTagType, HIGH_SEVERITY_SCORE_THRESHOLD } from "../Score";
import { trackingEvents } from "../tracking";
import { useDismissal } from "./hooks/useDismissal";
import { OccurrenceChart } from "./OccurrenceChart";
import * as s from "./styles";
import { NewErrorCardProps } from "./types";

export const getStatusString = (status: string) =>
  status.toLowerCase().startsWith("recent") ? "Recent" : status;

export const NewErrorCard = ({
  data,
  onSourceLinkClick,
  onPinStatusChange,
  onDismissStatusChange,
  onPinStatusToggle
}: NewErrorCardProps) => {
  const [isHistogramVisible, setIsHistogramVisible] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { backendInfo } = useConfigSelector();
  const [isPinned, setIsPinned] = useState(Boolean(data.pinnedAt));

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
    isDismissed,
    pinnedAt
  } = data;

  const {
    pin,
    unpin,
    data: pinUnpinResponse,
    isInProgress: isPinUnpinInProgress
  } = usePinning(id);

  const previousPinUnpinResponse = usePrevious(pinUnpinResponse);

  const statusTagType = getTagType(score.score);
  const {
    isDismissalChangeInProgress,
    dismiss,
    show,
    data: dismissalData
  } = useDismissal(id);
  const previousDismissalData = usePrevious(dismissalData);
  const selectorOptions: Option[] = useMemo(
    () =>
      affectedEndpoints.map((x) => ({
        route: x.displayName,
        serviceName: x.service,
        spanCodeObjectId: x.spanCodeObjectId
      })),
    [affectedEndpoints]
  );
  const [selectedEndpointKey, setSelectedEndpointKey] = useState<
    string | undefined
  >(selectorOptions[0] ? getEndpointKey(selectorOptions[0]) : undefined);

  useEffect(() => {
    const option = selectedEndpointKey
      ? selectorOptions.find((x) => getEndpointKey(x) === selectedEndpointKey)
      : undefined;

    setSelectedEndpointKey(option ? getEndpointKey(option) : undefined);
  }, [selectorOptions, selectedEndpointKey]);

  useEffect(() => {
    if (
      previousDismissalData !== dismissalData &&
      dismissalData?.payload.status === "success"
    ) {
      onDismissStatusChange(dismissalData.payload.id);
    }
  }, [dismissalData, onDismissStatusChange, previousDismissalData]);

  useEffect(() => {
    if (
      previousPinUnpinResponse !== pinUnpinResponse &&
      pinUnpinResponse?.payload.status === "success"
    ) {
      onPinStatusChange(pinUnpinResponse.payload.id);
    }
  }, [onPinStatusChange, pinUnpinResponse, previousPinUnpinResponse]);

  useEffect(() => {
    setIsPinned(Boolean(pinnedAt));
  }, [pinnedAt]);

  const handleLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ERROR_CARD_SOURCE_LINK_CLICKED);
    onSourceLinkClick(id, data.fromSpanCodeObjectId);
  };

  const handleAffectedEndpointsSelectorChange = (endpointKey: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_SELECTED_AFFECTED_ENDPOINT_CHANGED
    );

    setSelectedEndpointKey(endpointKey);
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

    if (value) {
      pin();
    } else {
      unpin();
    }

    setIsPinned(value);
    onPinStatusToggle();
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

  const selectedOption = useMemo(
    () =>
      selectedEndpointKey
        ? selectorOptions.find((x) => getEndpointKey(x) === selectedEndpointKey)
        : undefined,
    [selectedEndpointKey, selectorOptions]
  );

  const toolbarActions = [
    ...(isPinEnabled
      ? [
          <NewIconButton
            key={"pin-unpin"}
            isHighlighted={isPinned}
            buttonType={"secondaryBorderless"}
            icon={isPinned ? PinFillIcon : PinIcon}
            onClick={handlePinUnpinButtonClick}
            isDisabled={isPinUnpinInProgress}
          />
        ]
      : []),
    ...(isOccurrenceChartEnabled && selectedEndpointKey
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
      <s.Content>
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
                  <TimestampKeyValue
                    key={"first-detected"}
                    label={"First detected"}
                    timestamp={firstDetected}
                  />
                  <TimestampKeyValue
                    key={"last-detected"}
                    label={"Last detected"}
                    timestamp={lastDetected}
                  />
                  <span>
                    <s.StatusTagTooltipKey>Score:</s.StatusTagTooltipKey>{" "}
                    {score.score}
                  </span>
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
              value={selectedEndpointKey}
              options={selectorOptions}
            />
          </s.AffectedEndpointsContainer>
        )}
        {isOccurrenceChartEnabled && selectedOption && (
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
                  service={selectedOption.serviceName}
                  spanCodeObjectId={selectedOption.spanCodeObjectId}
                  errorId={id}
                />
              </s.OccurrenceChartContainer>
            </CSSTransition>
          </>
        )}
      </s.Content>
      {(toolbarActions.length > 0 || isDismissEnabled) && (
        <s.Footer>
          <s.FooterContainer>
            {isDismissEnabled && (
              <s.StyledDismissPanel
                confirmationMessage={"Dismiss error?"}
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
          </s.FooterContainer>
        </s.Footer>
      )}
    </s.Container>
  );
};
