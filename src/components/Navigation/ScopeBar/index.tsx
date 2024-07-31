import { useEffect, useState } from "react";
import { history } from "../../../containers/Main/history";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { CodeDetails, Scope } from "../../common/App/types";
import { NewPopover } from "../../common/NewPopover";
import { CrosshairIcon } from "../../common/icons/16px/CrosshairIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { actions } from "../actions";
import { Popup } from "../common/Popup";
import { trackingEvents } from "../tracking";
import { CodeContext, GoToCodeLocationPayload } from "../types";
import { TargetButtonMenu } from "./TargetButtonMenu";
import * as s from "./styles";
import { ScopeBarProps } from "./types";

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

export const ScopeBar = ({ scope, codeContext }: ScopeBarProps) => {
  const [isTargetButtonMenuOpen, setIsTargetButtonMenuOpen] = useState(false);

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

  const handleTargetButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.TARGET_BUTTON_CLICKED);
    if (scope && scope.code.codeDetailsList.length === 1) {
      handleGoToCodeLocation(scope.code.codeDetailsList[0]);
    }
  };

  const renderTargetButton = () => (
    <Tooltip title={targetButtonTooltip} isOpen={isTargetButtonTooltipOpen}>
      <s.ScopeBarButton
        disabled={!isTargetButtonEnabled}
        onClick={handleTargetButtonClick}
      >
        <CrosshairIcon color={"currentColor"} size={16} />
      </s.ScopeBarButton>
    </Tooltip>
  );

  return (
    <s.ScopeBar>
      <s.ScopeNameContainer>
        <s.SpanIconContainer>
          <EndpointIcon color={"currentColor"} />
        </s.SpanIconContainer>
        {scopeDisplayName && (
          <>
            <Tooltip title={scopeDisplayName}>
              <s.ScopeName>{scopeDisplayName}</s.ScopeName>
            </Tooltip>
            <s.StyledCopyButton text={scopeDisplayName} />
          </>
        )}
      </s.ScopeNameContainer>
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
