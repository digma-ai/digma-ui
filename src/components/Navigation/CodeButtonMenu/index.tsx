import { MouseEvent } from "react";
import { actions } from "../../../actions";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewButton } from "../../common/NewButton";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { MenuList } from "../common/MenuList";
import { Popup } from "../common/Popup";
import { trackingEvents } from "../tracking";
import { Spinner } from "./Spinner";
import * as s from "./styles";
import { CodeButtonMenuProps } from "./types";

export const CodeButtonMenu = (props: CodeButtonMenuProps) => {
  const handleAddObservabilityClick = () => {
    if (isString(props.codeContext.methodId)) {
      sendUserActionTrackingEvent(
        trackingEvents.ADD_OBSERVABILITY_BUTTON_CLICKED
      );
      props.onObservabilityAdd(props.codeContext.methodId);
    }
  };

  const handleAutoFixLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isString(props.codeContext.methodId)) {
      sendUserActionTrackingEvent(trackingEvents.AUTO_FIX_BUTTON_CLICKED);
      props.onAutoFix(props.codeContext.methodId);
    }
  };

  const handleTroubleshootingLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    sendUserActionTrackingEvent(trackingEvents.TROUBLESHOOTING_LINK_CLICKED);
    e.preventDefault();
    window.sendMessageToDigma({
      action: actions.OPEN_TROUBLESHOOTING_GUIDE
    });
    props.onClose();
  };

  const renderMissingDependency = () => (
    <s.MissingDependencyContainer>
      <s.MissingDependencyText>Missing dependency</s.MissingDependencyText>
      <s.Link
        href={"#"}
        $isDisabled={props.isAutoFixing}
        onClick={handleAutoFixLinkClick}
      >
        Autofix
      </s.Link>
      {props.isAutoFixing && <Spinner />}
    </s.MissingDependencyContainer>
  );

  const renderNoObservability = () => (
    <s.EmptyStateContainer>
      <s.Text>Click to observe this code in runtime</s.Text>
      <s.AddObservabilityButtonContainer>
        {props.isAnnotationAdding && <Spinner />}
        <NewButton
          buttonType={"primary"}
          disabled={
            props.codeContext.hasMissingDependency ??
            !props.codeContext.canInstrumentMethod ??
            props.isAnnotationAdding
          }
          onClick={handleAddObservabilityClick}
          label={"Add observability"}
        />
      </s.AddObservabilityButtonContainer>
    </s.EmptyStateContainer>
  );

  const renderNoData = () => (
    <s.EmptyStateContainer>
      <s.Title>
        No data received yet,{" "}
        <s.Link href={"#"} onClick={handleTroubleshootingLinkClick}>
          need help?
        </s.Link>
      </s.Title>
      <s.Text>Trigger any action to analyze runtime data</s.Text>
    </s.EmptyStateContainer>
  );

  const renderSpans = () => {
    const handleMenuItemClick = (spanCodeObjectId: string) => {
      sendUserActionTrackingEvent(trackingEvents.ASSET_SELECTED);
      props.onScopeChange(spanCodeObjectId);
    };

    return (
      <MenuList
        items={props.codeContext.spans.assets.map((x) => ({
          id: x.spanCodeObjectId,
          label: x.displayName,
          onClick: () => handleMenuItemClick(x.spanCodeObjectId),
          disabled: false,
          groupName: "Assets"
        }))}
      />
    );
  };

  return (
    <Popup
      header={
        props.codeContext.hasMissingDependency
          ? renderMissingDependency()
          : undefined
      }
    >
      <s.Container>
        <s.CodeLocation>
          <s.CodeIconContainer>
            <CodeIcon color={"currentColor"} />
          </s.CodeIconContainer>
          <Tooltip title={props.codeContext.displayName}>
            <s.CodeLocationName>
              {props.codeContext.displayName}
            </s.CodeLocationName>
          </Tooltip>
        </s.CodeLocation>
        {props.codeContext.isInstrumented === false
          ? renderNoObservability()
          : props.codeContext.spans.assets.length > 0
          ? renderSpans()
          : renderNoData()}
      </s.Container>
    </Popup>
  );
};
