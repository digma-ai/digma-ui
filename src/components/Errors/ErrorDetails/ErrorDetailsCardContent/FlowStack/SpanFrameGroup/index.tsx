import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { isString } from "../../../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { CodeIcon } from "../../../../../common/icons/12px/CodeIcon";
import { OpenTelemetryLogoIcon } from "../../../../../common/icons/12px/OpenTelemetryLogoIcon";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../../tracking";
import { Frame } from "../../../types";
import * as s from "./styles";
import { FrameItemCodeLocation, SpanFrameGroupProps } from "./types";

const getFrameItemText = (frame: Frame) => {
  if (window.ide === "PyCharm" && frame.executedCode) {
    return frame.executedCode;
  }

  return [frame.modulePhysicalPath || frame.moduleName, frame.functionName]
    .filter((x) => isString(x))
    .join(" in ");
};

export const SpanFrameGroup = ({
  frames,
  spanName,
  onGoCodeLocation,
  filesURIs
}: SpanFrameGroupProps) => {
  const handleFrameItemLinkClick = (location: FrameItemCodeLocation) => {
    sendUserActionTrackingEvent(trackingEvents.ERROR_STACK_TRACE_ITEM_CLICKED);
    onGoCodeLocation(location);
  };

  return (
    <s.Container>
      <s.Span>
        <s.SpanIconContainer>
          <OpenTelemetryLogoIcon color={"currentColor"} size={12} />
        </s.SpanIconContainer>
        <Tooltip title={spanName}>
          <s.SpanName>{spanName}</s.SpanName>
        </Tooltip>
      </s.Span>
      {frames.map((x) => {
        const frameItemText = getFrameItemText(x);
        const URI = x.codeObjectId ? filesURIs[x.codeObjectId] : undefined;
        const lineNumberString = x.lineNumber < 1 ? "..." : x.lineNumber;

        return (
          <s.FrameItem key={uuidv4()}>
            <s.FrameItemIconContainer>
              <CodeIcon color={"currentColor"} size={12} />
            </s.FrameItemIconContainer>
            <Tooltip title={frameItemText}>
              {URI ? (
                <s.FrameItemLink
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleFrameItemLinkClick({
                      URI,
                      lineNumber: x.lineNumber
                    });
                  }}
                >
                  {frameItemText}
                </s.FrameItemLink>
              ) : (
                <s.FrameItemText>{frameItemText}</s.FrameItemText>
              )}
            </Tooltip>
            <s.LineNumber>Line {lineNumberString}</s.LineNumber>
          </s.FrameItem>
        );
      })}
    </s.Container>
  );
};
