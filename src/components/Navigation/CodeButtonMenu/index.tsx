import { MouseEvent } from "react";
import { actions } from "../../../actions";
import { isString } from "../../../typeGuards/isString";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { NewButton } from "../../common/NewButton";
import { Tooltip } from "../../common/Tooltip";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { MenuList } from "../MenuList";
import { Popup } from "../Popup";
import { trackingEvents } from "../tracking";
import { Spinner } from "./Spinner";
import * as s from "./styles";
import { CodeButtonMenuProps } from "./types";

export const CodeButtonMenu = (props: CodeButtonMenuProps) => {
  const handleAddObservabilityClick = () => {
    if (isString(props.codeContext.methodId)) {
      sendTrackingEvent(trackingEvents.ADD_OBSERVABILITY_BUTTON_CLICKED);
      props.onObservabilityAdd(props.codeContext.methodId);
    }
  };

  const handleAutoFixLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isString(props.codeContext.methodId)) {
      sendTrackingEvent(trackingEvents.AUTO_FIX_BUTTON_CLICKED);
      props.onAutoFix(props.codeContext.methodId);
    }
  };

  const handleTroubleshootingLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    sendTrackingEvent(trackingEvents.TROUBLESHOOTING_LINK_CLICKED);
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
      <s.Title>No observability</s.Title>
      <s.Text>Click to observe this code in runtime</s.Text>
      <s.AddObservabilityButtonContainer>
        {props.isAnnotationAdding && <Spinner />}
        <NewButton
          buttonType={"primary"}
          disabled={
            props.codeContext.hasMissingDependency ||
            !props.codeContext.canInstrumentMethod ||
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
      <s.Title>No data yet</s.Title>
      <s.Text>Trigger any action to analyze runtime data</s.Text>
      <s.Link href={"#"} onClick={handleTroubleshootingLinkClick}>
        Not seeing your application data?
      </s.Link>
    </s.EmptyStateContainer>
  );

  const renderSpans = () => {
    const handleMenuItemClick = (spanCodeObjectId: string) => {
      sendTrackingEvent(trackingEvents.ASSET_SELECTED);
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
      height={"78px"}
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
