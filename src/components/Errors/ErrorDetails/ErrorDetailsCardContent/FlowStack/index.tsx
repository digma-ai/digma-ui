import { useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import type { DataFetcherConfiguration } from "../../../../../hooks/useFetchData";
import { useFetchData } from "../../../../../hooks/useFetchData";
import { useErrorsSelector } from "../../../../../store/errors/useErrorsSelector";
import { useStore } from "../../../../../store/useStore";
import { isNull } from "../../../../../typeGuards/isNull";
import { isString } from "../../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { TraceIcon } from "../../../../common/icons/16px/TraceIcon";
import { NewButton } from "../../../../common/v3/NewButton";
import { ToggleSwitch } from "../../../../common/v3/ToggleSwitch";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { actions } from "../../../actions";
import { trackingEvents } from "../../../tracking";
import type {
  FilesURIsMap,
  Frame,
  FrameStack,
  GetFilesURIsPayload,
  GoToCodeLocationPayload,
  GoToTracePayload,
  OpenRawErrorStackTraceInEditorPayload,
  SetFilesURIsPayload
} from "../../types";
import { SpanFrameGroup } from "./SpanFrameGroup";
import type { FrameItemCodeLocation } from "./SpanFrameGroup/types";
import * as s from "./styles";
import type { FlowProps as FlowStackProps } from "./types";

const filesURIsDataFetcherConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_FILES_URIS,
  responseAction: actions.SET_FILES_URIS,
  refreshOnPayloadChange: true
};

export const FlowStack = ({ data }: FlowStackProps) => {
  const { errorDetailsWorkspaceItemsOnly: showWorkspaceOnly } =
    useErrorsSelector();
  const { setErrorDetailsWorkspaceItemsOnly } = useStore.getState();
  const stacksContainerRef = useRef<HTMLDivElement>(null);

  const frameStacks = useMemo(
    () => data.frameStacks.filter(Boolean) as FrameStack[],
    [data]
  );

  const filesURIsPayload = useMemo(
    () => ({
      codeObjectIds: frameStacks
        .map((stack) => stack.frames.map((x) => x?.codeObjectId))
        .flat()
        .filter(isString)
    }),
    [frameStacks]
  );

  const { data: filesURIsResponse } = useFetchData<
    GetFilesURIsPayload,
    SetFilesURIsPayload
  >(filesURIsDataFetcherConfiguration, filesURIsPayload);

  const filesURIs: FilesURIsMap = filesURIsResponse?.filesURIs ?? {};

  useEffect(() => {
    stacksContainerRef.current?.scrollTo(0, 0);
  }, [showWorkspaceOnly]);

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
            frameStacks[0].frames[0]?.spanName ??
            `Sample trace for error ${exceptionType ?? ""}`.trim(),
          spanCodeObjectId: frameStacks[0].frames[0]?.codeObjectId ?? undefined
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
    setErrorDetailsWorkspaceItemsOnly(value);
  };

  const handleFrameItemLinkClick = ({
    URI,
    lineNumber
  }: FrameItemCodeLocation) => {
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
            if (i === 0 || frame.spanName !== frames[i - 1].spanName) {
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
                    const key = frames[0].spanName ?? uuidv4();
                    const spanName = spanFrames[0].spanName ?? "N/A";

                    return (
                      <SpanFrameGroup
                        key={key}
                        spanName={spanName}
                        frames={spanFrames}
                        filesURIs={filesURIs}
                        onGoCodeLocation={handleFrameItemLinkClick}
                      />
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
          <NewButton
            buttonType={"secondary"}
            label={"Raw error stack trace"}
            onClick={handleRawErrorStackTraceButton}
            isDisabled={isNull(data.stackTrace)}
          />
          <Tooltip title={"Open Trace"}>
            <NewButton
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
