import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePrevious } from "../../../hooks/usePrevious";
import { platform } from "../../../platform";
import { useInvestigateMutation } from "../../../redux/services/digma";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { ViewMode } from "../../../store/errors/errorsSlice";
import { useErrorsSelector } from "../../../store/errors/useErrorsSelector";
import { useStore } from "../../../store/useStore";
import { FeatureFlag } from "../../../types";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getIdeLauncherLinkForError } from "../../../utils/getIdeLauncherLinkForError";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../common/AffectedEndpointsSelector";
import type { Option } from "../../common/AffectedEndpointsSelector/types";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { HistogramIcon } from "../../common/icons/16px/HistogramIcon";
import { LightBulbWithScrewIcon } from "../../common/icons/16px/LightBulbWithScrewIcon";
import { PinFillIcon } from "../../common/icons/16px/PinFillIcon";
import { PinIcon } from "../../common/icons/16px/PinIcon";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import {
  InvestigateButton,
  InvestigateButtonSpinner
} from "../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/styles";
import { TimestampKeyValue } from "../ErrorCard/TimestampKeyValue";
import { usePinning } from "../GlobalErrorsList/usePinning";
import { getTagType, HIGH_SEVERITY_SCORE_THRESHOLD } from "../Score";
import { trackingEvents } from "../tracking";
import { OccurrenceChart } from "./OccurrenceChart";
import * as s from "./styles";
import type { NewErrorCardProps } from "./types";
import { actions, useDismissal } from "./useDismissal";

export const getStatusString = (status: string) =>
  status.toLowerCase().startsWith("recent") ? "Recent" : status;

export const NewErrorCard = ({
  data,
  onSourceLinkClick,
  onPinStatusChange,
  onDismissStatusChange,
  onPinStatusToggle,
  backendInfo,
  onScopeChange,
  environmentId
}: NewErrorCardProps) => {
  const [isHistogramVisible, setIsHistogramVisible] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { globalErrorsList } = useErrorsSelector();
  const { isAgenticEnabled } = useConfigSelector();
  const { setGlobalErrorsViewMode } = useStore.getState();
  const [isPinned, setIsPinned] = useState(Boolean(data.pinnedAt));
  const [investigate, investigateResult] = useInvestigateMutation();

  const isOccurrenceChartEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsErrorOccurrenceChartEnabled
  );

  const isPinEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsGlobalErrorPinEnabled
  );

  const isDismissEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsGlobalErrorDismissEnabled
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
    isInProgress: isDismissalChangeInProgress,
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
      : selectorOptions[0];

    setSelectedEndpointKey(option ? getEndpointKey(option) : undefined);
  }, [selectorOptions, selectedEndpointKey]);

  useEffect(() => {
    if (
      previousDismissalData !== dismissalData &&
      dismissalData?.payload.status === "success"
    ) {
      onDismissStatusChange(dismissalData.payload.id);

      if (
        dismissalData.action === actions.UNDISMISS_ERROR &&
        globalErrorsList?.length === 1 &&
        globalErrorsList[0].id === dismissalData.payload.id
      ) {
        setGlobalErrorsViewMode(ViewMode.All);
      }
    }
  }, [
    dismissalData,
    globalErrorsList,
    onDismissStatusChange,
    previousDismissalData,
    setGlobalErrorsViewMode
  ]);

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

    onScopeChange({
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

  const handleIdeButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_OPEN_IN_IDE_BUTTON_CLICKED
    );
    const errorIdeLauncherLink = getIdeLauncherLinkForError(id);

    if (errorIdeLauncherLink) {
      openURLInDefaultBrowser(errorIdeLauncherLink);
    }
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

  const handleInvestigateButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_CARD_INVESTIGATE_BUTTON_CLICKED
    );

    void investigate({
      data: {
        targetId: id,
        targetType: "error"
      }
    })
      .unwrap()
      .then((data) => {
        const incidentId = data.incidentId;
        openURLInDefaultBrowser(`/agentic/incidents/${incidentId}`);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error("Failed to create incident from error");
      });
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
          <Tooltip title={isPinned ? "Unpin" : "Pin"} key={"pin-unpin"}>
            <NewIconButton
              isHighlighted={isPinned}
              buttonType={"secondaryBorderless"}
              icon={isPinned ? PinFillIcon : PinIcon}
              onClick={handlePinUnpinButtonClick}
              isDisabled={isPinUnpinInProgress}
            />
          </Tooltip>
        ]
      : []),
    ...(isOccurrenceChartEnabled && selectedEndpointKey
      ? [
          <Tooltip
            title={
              isHistogramVisible
                ? "Hide occurrence chart"
                : "Show occurrence chart"
            }
            key={"toggle-occurrence-chart"}
          >
            <NewIconButton
              isHighlighted={isHistogramVisible}
              buttonType={"secondaryBorderless"}
              icon={HistogramIcon}
              onClick={handleHistogramButtonClick}
            />
          </Tooltip>
        ]
      : []),
    ...(platform === "Web"
      ? [
          <Tooltip title={"Open in IDE"} key={"ide"}>
            <NewIconButton
              buttonType={"secondaryBorderless"}
              icon={CodeIcon}
              onClick={handleIdeButtonClick}
            />
          </Tooltip>
        ]
      : []),
    ...(platform === "Web" && isAgenticEnabled
      ? [
          <InvestigateButton
            key={"investigate"}
            icon={
              investigateResult.isLoading
                ? () => <InvestigateButtonSpinner />
                : LightBulbWithScrewIcon
            }
            onClick={handleInvestigateButtonClick}
            isDisabled={investigateResult.isLoading}
            label={
              investigateResult.isLoading ? "Investigating..." : "Investigate"
            }
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
                  environmentId={environmentId}
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
