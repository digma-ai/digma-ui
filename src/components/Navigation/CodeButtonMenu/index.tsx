import { MouseEvent } from "react";
import { actions } from "../../../actions";
import { isString } from "../../../typeGuards/isString";
import { Menu } from "../styles";
import { CodeButtonMenuProps } from "./types";

export const CodeButtonMenu = (props: CodeButtonMenuProps) => {
  const handleAddObservabilityClick = () => {
    isString(props.codeContext.methodId) &&
      props.onObservabilityAdd(props.codeContext.methodId);
  };

  const handleAutoFixLinkClick = () => {
    isString(props.codeContext.methodId) &&
      props.onAutoFix(props.codeContext.methodId);
  };

  const handleTroubleshootingLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.sendMessageToDigma({
      action: actions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const renderMissingDependency = () => (
    <div>
      <div>missing dependency: opentelemetry.annotation</div>
      <button disabled={props.isAutoFixing} onClick={handleAutoFixLinkClick}>
        Autofix
      </button>
      {props.isAutoFixing && <div>Autofixing...</div>}
    </div>
  );

  const renderNoObservability = () => (
    <div>
      <div>No observability</div>
      <div>Digma has not detected any information from this location</div>
      {props.codeContext.hasMissingDependency && renderMissingDependency()}
      <button
        disabled={
          props.codeContext.hasMissingDependency ||
          !props.codeContext.canInstrumentMethod ||
          props.isAnnotationAdding
        }
        onClick={handleAddObservabilityClick}
      >
        Add observability
      </button>
      {props.isAnnotationAdding && <div>Adding the annotation...</div>}
    </div>
  );

  const renderNoData = () => (
    <div>
      <div>
        Trigger actions that call this application to learn more about its
        runtime behavior
      </div>
      <a href={"#"} onClick={handleTroubleshootingLinkClick}>
        Not seeing your application data?
      </a>
    </div>
  );

  const renderSpans = () => (
    <div>
      <span>Assets</span>
      {props.codeContext.spans.map((span) => (
        <div
          key={span.spanCodeObjectId}
          onClick={() => {
            props.onScopeChange(span.spanCodeObjectId, span.serviceName);
          }}
        >
          {span.displayName}
        </div>
      ))}
    </div>
  );

  return (
    <Menu>
      <span>{props.codeContext.displayName}</span>
      {props.codeContext.isInstrumented === false
        ? renderNoObservability()
        : props.codeContext.spans.length > 0
        ? renderSpans()
        : renderNoData()}
    </Menu>
  );
};
