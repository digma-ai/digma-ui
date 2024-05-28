import { useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { ChangeScopePayload } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { CodeDetails, Scope } from "../../common/App/types";
import { NewPopover } from "../../common/NewPopover";
import { CrosshairIcon } from "../../common/icons/16px/CrosshairIcon";
import { HomeIcon } from "../../common/icons/16px/HomeIcon";
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
  codeContext?: CodeContext,
  scope?: Scope
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

export const ScopeBar = (props: ScopeBarProps) => {
  const [isTargetButtonMenuOpen, setIsTargetButtonMenuOpen] = useState(false);

  const scopeDisplayName = props.scope
    ? props.scope.span
      ? props.scope.span.displayName
      : "Home"
    : "";

  const targetButtonTooltip = getTargetButtonTooltip(
    props.codeContext,
    props.scope
  );

  const isTargetButtonTooltipOpen =
    isTargetButtonMenuOpen || targetButtonTooltip.length === 0
      ? false
      : undefined;

  const isTargetButtonEnabled = Boolean(
    props.scope?.span &&
      [
        ...props.scope.code.codeDetailsList,
        ...props.scope.code.relatedCodeDetailsList
      ].length > 0 &&
      !isAlreadyAtCode(props.codeContext, props.scope)
  );
  const isTargetButtonMenuEnabled =
    props.scope &&
    (props.scope.code.codeDetailsList.length > 1 ||
      props.scope.code.relatedCodeDetailsList.length > 0);

  useEffect(() => {
    setIsTargetButtonMenuOpen(false);
  }, [props.scope]);

  const handleHomeButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.HOME_BUTTON_CLICKED);
    window.sendMessageToDigma<ChangeScopePayload>({
      action: globalActions.CHANGE_SCOPE,
      payload: {
        span: null
      }
    });
  };

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
    if (props.scope && props.scope.code.codeDetailsList.length === 1) {
      handleGoToCodeLocation(props.scope.code.codeDetailsList[0]);
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

  const isActive = Boolean(props.scope?.span);

  return (
    <s.ScopeBar $isActive={Boolean(props.scope?.span)}>
      <s.ScopeBarButton
        disabled={!props.scope?.span}
        onClick={handleHomeButtonClick}
      >
        <HomeIcon color={"currentColor"} size={16} />
      </s.ScopeBarButton>
      <s.ScopeBarDivider />
      <s.ScopeNameContainer>
        <Tooltip title={scopeDisplayName}>
          <s.ScopeName>{scopeDisplayName}</s.ScopeName>
        </Tooltip>
        {isActive && <s.StyledCopyButton text={scopeDisplayName} />}
      </s.ScopeNameContainer>
      <s.ScopeBarDivider />
      {isTargetButtonMenuEnabled ? (
        <NewPopover
          content={
            <Popup height={"78px"}>
              {props.scope && (
                <TargetButtonMenu
                  scope={props.scope}
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
