import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dispatcher } from "../../../../dispatcher";
import { usePersistence } from "../../../../hooks/usePersistence";
import { isNull } from "../../../../typeGuards/isNull";
import { isString } from "../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CodeIcon } from "../../../common/icons/12px/CodeIcon";
import { OpenTelemetryLogoIcon } from "../../../common/icons/12px/OpenTelemetryLogoIcon";
import { TraceIcon } from "../../../common/icons/16px/TraceIcon";
import { Button } from "../../../common/v3/Button";
import { ToggleSwitch } from "../../../common/v3/ToggleSwitch";
import { Tooltip } from "../../../common/v3/Tooltip";
import { actions } from "../../actions";
import { trackingEvents } from "../../tracking";
import {
  Frame,
  FrameStack,
  GetFilesURIsPayload,
  GoToCodeLocationPayload,
  GoToTracePayload,
  OpenRawErrorStackTraceInEditorPayload,
  SetFilesURIsPayload
} from "../types";
import * as s from "./styles";
import {
  FlowProps as FlowStackProps,
  FrameItemCodeLocation,
  ShowOnlyWorkspaceErrorStackTraceItemsPayload
} from "./types";

const SHOW_ONLY_WORKSPACE_ERROR_STACK_TRACE_ITEMS_PERSISTENCE_KEY =
  "showOnlyWorkspaceErrorStackTraceItems";

const getFrameItemText = (frame: Frame) => {
  if (window.ide === "PyCharm" && frame.executedCode) {
    return frame.executedCode;
  }

  return [frame.modulePhysicalPath || frame.moduleName, frame.functionName]
    .filter((x) => isString(x))
    .join(" in ");
};

export const FlowStack = ({ data }: FlowStackProps) => {
  const [persistedShowWorkspaceItemsOnly, setPersistedShowWorkspaceItemsOnly] =
    usePersistence<ShowOnlyWorkspaceErrorStackTraceItemsPayload>(
      SHOW_ONLY_WORKSPACE_ERROR_STACK_TRACE_ITEMS_PERSISTENCE_KEY,
      "application"
    );
  const [showWorkspaceOnly, setShowWorkspaceOnly] = useState(false);
  const stacksContainerRef = useRef<HTMLDivElement>(null);

  const frameStacks = useMemo(
    () => data.frameStacks.filter(Boolean) as FrameStack[],
    [data]
  );
  const [filesURIs, setFilesURIs] = useState<Record<string, string>>({});

  useEffect(() => {
    const codeObjectsToResolve = frameStacks
      .map((stack) => stack.frames.map((x) => x?.codeObjectId))
      .flat()
      .filter((x) => isString(x)) as string[];

    window.sendMessageToDigma<GetFilesURIsPayload>({
      action: actions.GET_FILES_URIS,
      payload: {
        codeObjectIds: codeObjectsToResolve
      }
    });
  }, [frameStacks]);

  useEffect(() => {
    stacksContainerRef.current?.scrollTo(0, 0);
  }, [frameStacks, showWorkspaceOnly]);

  useEffect(() => {
    setShowWorkspaceOnly(Boolean(persistedShowWorkspaceItemsOnly?.value));
  }, [persistedShowWorkspaceItemsOnly]);

  useEffect(() => {
    const handleSetFilesURIs = (payload: unknown) => {
      setFilesURIs((payload as SetFilesURIsPayload).filesURIs);
    };

    dispatcher.addActionListener(actions.SET_FILES_URIS, handleSetFilesURIs);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_FILES_URIS,
        handleSetFilesURIs
      );
    };
  }, [filesURIs]);

  if (frameStacks.length === 0) {
    return null;
  }

  const exceptionType = frameStacks[0].exceptionType;
  const exceptionMessage = frameStacks[0].exceptionMessage;
  const traceId = data.latestTraceId;

  const handleTraceButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.TRACE_BUTTON_CLICKED);

    if (isString(traceId)) {
      window.sendMessageToDigma<GoToTracePayload>({
        action: actions.GO_TO_TRACE,
        payload: {
          traceId,
          spanName:
            frameStacks[0].frames[0]?.spanName ||
            `Sample trace for error ${exceptionType || ""}`.trim(),
          spanCodeObjectId: frameStacks[0].frames[0]?.codeObjectId || undefined
        }
      });
    }
  };

  const handleRawErrorStackTraceButton = () => {
    sendUserActionTrackingEvent(
      trackingEvents.RAW_ERROR_STACK_TRACE_BUTTON_CLICKED
    );

    if (isString(data.stackTrace)) {
      window.sendMessageToDigma<OpenRawErrorStackTraceInEditorPayload>({
        action: actions.OPEN_RAW_ERROR_STACK_TRACE_IN_EDITOR,
        payload: {
          stackTrace: data.stackTrace
        }
      });
    }
  };

  const handleWorkspaceOnlyToggleSwitchChange = (value: boolean) => {
    sendUserActionTrackingEvent(trackingEvents.WORKSPACE_ONLY_TOGGLE_SWITCHED, {
      value
    });

    setShowWorkspaceOnly(value);
    setPersistedShowWorkspaceItemsOnly({
      value
    });
  };

  const handleFrameItemLinkClick = ({
    URI,
    lineNumber
  }: FrameItemCodeLocation) => {
    sendUserActionTrackingEvent(trackingEvents.ERROR_STACK_TRACE_ITEM_CLICKED);

    window.sendMessageToDigma<GoToCodeLocationPayload>({
      action: actions.GO_TO_CODE_LOCATION,
      payload: {
        URI,
        lineNumber: Math.max(1, lineNumber),
        lastInstanceCommitId: data.lastInstanceCommitId
      }
    });
  };

  return (
    <s.Container>
      <s.StacksContainer ref={stacksContainerRef}>
        {frameStacks.map((x) => {
          const frames = x.frames.filter(Boolean) as Frame[];
          const visibleFrames = showWorkspaceOnly
            ? frames.filter((x) => x.codeObjectId && filesURIs[x.codeObjectId])
            : frames;

          const spanGroups = visibleFrames.reduce((acc, frame, i) => {
            if (i == 0 || frame.spanName !== frames[i - 1].spanName) {
              acc.push([frame]);
            } else {
              acc[acc.length - 1].push(frame);
            }
            return acc;
          }, [] as Frame[][]);

          return (
            <s.StackContainer key={uuidv4()}>
              <s.StackHeader>
                <s.StackTitleContainer>
                  <Tooltip title={exceptionType}>
                    <s.StackTitle>{exceptionType}</s.StackTitle>
                  </Tooltip>
                  {exceptionMessage}
                </s.StackTitleContainer>
              </s.StackHeader>
              <s.Divider />
              {spanGroups.length > 0 && (
                <s.SpanGroupsContainer>
                  {spanGroups.map((spanFrames) => {
                    const spanName = spanFrames[0].spanName;

                    return (
                      <s.SpanGroup key={spanName}>
                        <s.Span>
                          <s.SpanIconContainer>
                            <OpenTelemetryLogoIcon
                              color={"currentColor"}
                              size={12}
                            />
                          </s.SpanIconContainer>
                          <Tooltip title={spanName}>
                            <s.SpanName>{spanName}</s.SpanName>
                          </Tooltip>
                        </s.Span>
                        {spanFrames.map((x) => {
                          const frameItemText = getFrameItemText(x);
                          const URI = x.codeObjectId
                            ? filesURIs[x.codeObjectId]
                            : undefined;
                          const lineNumberString =
                            x.lineNumber < 1 ? "..." : x.lineNumber;

                          return (
                            <s.FrameItem key={uuidv4()}>
                              <s.FrameItemIconContainer>
                                <CodeIcon color={"currentColor"} size={12} />
                              </s.FrameItemIconContainer>
                              <Tooltip title={frameItemText}>
                                {URI ? (
                                  <s.FrameItemLink
                                    onClick={(
                                      e: MouseEvent<HTMLAnchorElement>
                                    ) => {
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
                                  <s.FrameItemText>
                                    {frameItemText}
                                  </s.FrameItemText>
                                )}
                              </Tooltip>
                              <s.LineNumber>
                                Line {lineNumberString}
                              </s.LineNumber>
                            </s.FrameItem>
                          );
                        })}
                      </s.SpanGroup>
                    );
                  })}
                </s.SpanGroupsContainer>
              )}
            </s.StackContainer>
          );
        })}
      </s.StacksContainer>
      <s.Footer>
        <ToggleSwitch
          label={
            <s.WorkspaceOnlyToggleLabel>
              Workspace only
            </s.WorkspaceOnlyToggleLabel>
          }
          checked={showWorkspaceOnly}
          onChange={handleWorkspaceOnlyToggleSwitchChange}
          labelPosition={"end"}
        />
        <s.FooterButtonsContainer>
          <Button
            buttonType={"secondary"}
            label={"Raw error stack trace"}
            onClick={handleRawErrorStackTraceButton}
            isDisabled={isNull(data.stackTrace)}
          />
          <Tooltip title={"Open Trace"}>
            <Button
              icon={TraceIcon}
              onClick={handleTraceButtonClick}
              isDisabled={isNull(traceId)}
            />
          </Tooltip>
        </s.FooterButtonsContainer>
      </s.Footer>
    </s.Container>
  );
};
