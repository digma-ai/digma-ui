import { useEffect, useState } from "react";
import { history } from "../../../containers/Main/history";
import { isString } from "../../../typeGuards/isString";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents as mainTrackingEvents } from "../../Main/tracking";
import type { CodeDetails, Scope } from "../../common/App/types";
import { NewPopover } from "../../common/NewPopover";
import { ChainIcon } from "../../common/icons/14px/ChainIcon";
import { CrosshairIcon } from "../../common/icons/16px/CrosshairIcon";
import { MaximizeIcon } from "../../common/icons/16px/MaximizeIcon";
import { MinimizeIcon } from "../../common/icons/16px/MinimizeIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import type { LinkedEndpoint } from "../SpanInfo/types";
import { actions } from "../actions";
import { Popup } from "../common/Popup";
import { trackingEvents } from "../tracking";
import type { CodeContext, GoToCodeLocationPayload } from "../types";
import { LinkedEndpointsMenu } from "./LinkedEndpointsMenu";
import { TargetButtonMenu } from "./TargetButtonMenu";
import * as s from "./styles";
import type { ScopeBarProps } from "./types";

const EXPANDED_SCOPE_DISPLAY_NAME_PLACEHOLDER = "Full scope text below";

const isAlreadyAtCode = (codeContext?: CodeContext, scope?: Scope): boolean => {
  if (!codeContext || !scope?.span) {
    return false;
  }

  return Boolean(
    codeContext.methodId &&
      scope.span.methodId &&
      codeContext.methodId === scope.span.methodId
  );
};

const getTargetButtonTooltip = (
  codeContext: CodeContext | undefined,
  scope: Scope | null
): string => {
  if (!scope?.span) {
    return "";
  }

  if (isAlreadyAtCode(codeContext, scope)) {
    return "Already at code";
  }

  if (
    [...scope.code.codeDetailsList, scope.code.relatedCodeDetailsList]
      .length === 0
  ) {
    return "Code not found";
  } else {
    return "Navigate to code";
  }
};

export const ScopeBar = ({
  scope,
  codeContext,
  isExpanded,
  onExpandCollapseChange,
  isSpanInfoEnabled,
  linkedEndpoints
}: ScopeBarProps) => {
  const [isTargetButtonMenuOpen, setIsTargetButtonMenuOpen] = useState(false);
  const [isLinkedEndpointsMenuOpen, setIsLinkedEndpointsMenuOpen] =
    useState(false);

  const location = history.getCurrentLocation();
  const spanDisplayName = scope?.span?.displayName;
  const spanCodeObjectId = scope?.span?.spanCodeObjectId;
  // Take scope display name from history state if it's not provided
  const scopeDisplayName = spanDisplayName
    ? spanDisplayName
    : isString(spanCodeObjectId) &&
      spanCodeObjectId === location?.state?.spanCodeObjectId
    ? location?.state?.spanDisplayName
    : "";

  const targetButtonTooltip = getTargetButtonTooltip(codeContext, scope);

  const isTargetButtonTooltipOpen =
    isTargetButtonMenuOpen || targetButtonTooltip.length === 0
      ? false
      : undefined;

  const isTargetButtonEnabled = Boolean(
    scope?.span &&
      [...scope.code.codeDetailsList, ...scope.code.relatedCodeDetailsList]
        .length > 0 &&
      !isAlreadyAtCode(codeContext, scope)
  );

  const isTargetButtonMenuEnabled =
    scope &&
    (scope.code.codeDetailsList.length > 1 ||
      scope.code.relatedCodeDetailsList.length > 0);

  const isLinkedEndpointsButtonEnabled = linkedEndpoints.length > 0;

  useEffect(() => {
    setIsTargetButtonMenuOpen(false);
  }, [scope]);

  const handleGoToCodeLocation = (codeDetails: CodeDetails) => {
    window.sendMessageToDigma<GoToCodeLocationPayload>({
      action: actions.GO_TO_CODE_LOCATION,
      payload: {
        codeDetails
      }
    });
    setIsTargetButtonMenuOpen(false);
  };

  const handleLinkedEndpointsClick = (endpoint: LinkedEndpoint) => {
    changeScope({
      span: {
        spanCodeObjectId: endpoint.spanCodeObjectId
      }
    });
    setIsLinkedEndpointsMenuOpen(true);
  };

  const handleExpandCollapseButtonClick = () => {
    if (isExpanded) {
      sendUserActionTrackingEvent(
        mainTrackingEvents.SCOPE_BAR_COLLAPSE_BUTTON_CLICKED
      );
    } else {
      sendUserActionTrackingEvent(
        mainTrackingEvents.SCOPE_BAR_EXPAND_BUTTON_CLICKED
      );
    }
    onExpandCollapseChange(!isExpanded);
  };

  const handleLinkedEndpointsButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LINKED_ENDPOINTS_BUTTON_CLICKED);
    setIsLinkedEndpointsMenuOpen(!isLinkedEndpointsMenuOpen);
  };

  const handleTargetButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.TARGET_BUTTON_CLICKED);
    if (scope && scope.code.codeDetailsList.length === 1) {
      handleGoToCodeLocation(scope.code.codeDetailsList[0]);
    }
  };

  const renderTargetButton = () => (
    <Tooltip title={targetButtonTooltip} isOpen={isTargetButtonTooltipOpen}>
      <NewIconButton
        icon={CrosshairIcon}
        isDisabled={!isTargetButtonEnabled}
        onClick={handleTargetButtonClick}
        buttonType={"secondaryBorderless"}
      />
    </Tooltip>
  );

  return (
    <s.ScopeBar>
      <s.ScopeNameContainer>
        <s.SpanIconContainer>
          <EndpointIcon color={"currentColor"} />
        </s.SpanIconContainer>
        {isSpanInfoEnabled && isExpanded ? (
          <Tooltip title={EXPANDED_SCOPE_DISPLAY_NAME_PLACEHOLDER}>
            <s.ScopeNamePlaceholder>
              {EXPANDED_SCOPE_DISPLAY_NAME_PLACEHOLDER}
            </s.ScopeNamePlaceholder>
          </Tooltip>
        ) : scopeDisplayName ? (
          <>
            <Tooltip title={scopeDisplayName}>
              <s.ScopeName>{scopeDisplayName}</s.ScopeName>
            </Tooltip>
            <s.StyledCopyButton text={scopeDisplayName} />
          </>
        ) : null}
      </s.ScopeNameContainer>
      {isLinkedEndpointsButtonEnabled && (
        <NewPopover
          content={
            <s.LinkedEndpointsPopup height={"126px"}>
              <LinkedEndpointsMenu
                endpoints={linkedEndpoints}
                onEndpointsClick={handleLinkedEndpointsClick}
              />
            </s.LinkedEndpointsPopup>
          }
          onOpenChange={setIsLinkedEndpointsMenuOpen}
          isOpen={isLinkedEndpointsMenuOpen}
          placement={"bottom-start"}
          width={"100%"}
        >
          <div>
            <Tooltip title={"Click to see the target endpoint"}>
              <NewIconButton
                icon={ChainIcon}
                onClick={handleLinkedEndpointsButtonClick}
                buttonType={"secondaryBorderless"}
              />
            </Tooltip>
          </div>
        </NewPopover>
      )}
      {isSpanInfoEnabled && (
        <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
          <NewIconButton
            icon={isExpanded ? MinimizeIcon : MaximizeIcon}
            onClick={handleExpandCollapseButtonClick}
            buttonType={"secondaryBorderless"}
          />
        </Tooltip>
      )}
      {isTargetButtonMenuEnabled ? (
        <NewPopover
          content={
            <Popup height={"126px"}>
              {scope && (
                <TargetButtonMenu
                  scope={scope}
                  onGoToCodeLocation={handleGoToCodeLocation}
                />
              )}
            </Popup>
          }
          onOpenChange={setIsTargetButtonMenuOpen}
          isOpen={isTargetButtonMenuOpen}
          placement={"bottom-end"}
        >
          <div>{renderTargetButton()}</div>
        </NewPopover>
      ) : (
        renderTargetButton()
      )}
    </s.ScopeBar>
  );
};
