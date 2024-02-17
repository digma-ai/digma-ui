import { MouseEvent } from "react";
import { actions } from "../../../actions";
import { isString } from "../../../typeGuards/isString";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { MenuList } from "../MenuList";
import * as s from "./styles";
import { CodeButtonMenuProps } from "./types";

export const CodeButtonMenu = (props: CodeButtonMenuProps) => {
  const handleAddObservabilityClick = () => {
    isString(props.codeContext.methodId) &&
      props.onObservabilityAdd(props.codeContext.methodId);
  };

  const handleAutoFixLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    isString(props.codeContext.methodId) &&
      props.onAutoFix(props.codeContext.methodId);
  };

  const handleTroubleshootingLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.sendMessageToDigma({
      action: actions.OPEN_TROUBLESHOOTING_GUIDE
    });
    props.onClose();
  };

  const renderMissingDependency = () => (
    <s.MissingDependencyFooter>
      <s.MissingDependencyText>Missing dependency</s.MissingDependencyText>
      <s.Link
        href={"#"}
        $isDisabled={props.isAutoFixing}
        onClick={handleAutoFixLinkClick}
      >
        Autofix
      </s.Link>
    </s.MissingDependencyFooter>
  );

  const renderNoObservability = () => (
    <s.EmptyStateContainer>
      <s.Title>No observability</s.Title>
      <s.Text>Digma has not detected any information from this location</s.Text>
      <s.AddObservabilityButton
        buttonType={"primary"}
        disabled={
          props.codeContext.hasMissingDependency ||
          !props.codeContext.canInstrumentMethod ||
          props.isAnnotationAdding
        }
        onClick={handleAddObservabilityClick}
        label={"Add observability"}
      />
      {props.codeContext.hasMissingDependency && renderMissingDependency()}
    </s.EmptyStateContainer>
  );

  const renderNoData = () => (
    <s.EmptyStateContainer>
      <s.Text>
        Trigger actions that call this application to learn more about its
        runtime behavior
      </s.Text>
      <s.Link href={"#"} onClick={handleTroubleshootingLinkClick}>
        Not seeing your application data?
      </s.Link>
    </s.EmptyStateContainer>
  );

  const renderSpans = () => (
    <MenuList
      items={props.codeContext.spans.assets.map((x) => ({
        id: x.spanCodeObjectId,
        label: x.displayName,
        onClick: () => props.onScopeChange(x.spanCodeObjectId),
        disabled: false,
        groupName: "Assets"
      }))}
    />
  );

  return (
    <s.Container>
      <s.CodeLocation>
        <s.CodeIconContainer>
          <CodeIcon color={"currentColor"} />
        </s.CodeIconContainer>
        <s.CodeLocationName>
          {props.codeContext.displayName}{" "}
        </s.CodeLocationName>
      </s.CodeLocation>
      {props.codeContext.isInstrumented === false
        ? renderNoObservability()
        : props.codeContext.spans.assets.length > 0
        ? renderSpans()
        : renderNoData()}
    </s.Container>
  );
};
