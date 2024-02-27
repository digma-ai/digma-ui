import { isString } from "../../../typeGuards/isString";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getDurationString } from "../../../utils/getDurationString";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { NewButton } from "../../common/NewButton";
import { Tag } from "../../common/Tag";
import { Tooltip } from "../../common/Tooltip";
import { TraceIcon } from "../../common/icons/12px/TraceIcon";
import { JiraLogoIcon } from "../../common/icons/16px/JiraLogoIcon";
import { TimerIcon } from "../../common/icons/16px/TimerIcon";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { CrossCircleIcon } from "../../common/icons/CrossCircleIcon";
import { GlobeIcon } from "../../common/icons/GlobeIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { Test } from "../types";
import * as s from "./styles";
import {
  GoToSpanOfTestPayload,
  GoToTracePayload,
  RunTestPayload,
  TestCardProps
} from "./types";

const renderTestResultTag = (test: Test) => {
  switch (test.result) {
    case "success":
      return (
        <Tag
          icon={CheckmarkCircleInvertedIcon}
          type={"success"}
          title={"Pass"}
        />
      );
    case "fail":
      return (
        <Tag
          icon={CrossCircleIcon}
          type={"highSeverity"}
          title={
            isString(test.errorOrFailMessage)
              ? `Fail: ${test.errorOrFailMessage}`
              : undefined
          }
        />
      );
    case "error":
      return (
        <Tag
          icon={CrossCircleIcon}
          type={"highSeverity"}
          title={
            isString(test.errorOrFailMessage)
              ? `Error: ${test.errorOrFailMessage}`
              : undefined
          }
        />
      );
  }
};

export const TestCard = (props: TestCardProps) => {
  const handleTestNameClick = () => {
    sendTrackingEvent(trackingEvents.TEST_NAME_LINK_CLICKED);
    window.sendMessageToDigma<GoToSpanOfTestPayload>({
      action: actions.GO_TO_SPAN_OF_TEST,
      payload: {
        environment: props.test.environmentId,
        spanCodeObjectId: props.test.spanInfo.spanCodeObjectId,
        methodCodeObjectId: props.test.spanInfo.methodCodeObjectId
      }
    });
  };

  const handleTicketButtonClick = () => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED);
    props.onTicketInfoOpen(props.test);
  };

  const handleTraceButtonClick = () => {
    sendTrackingEvent(trackingEvents.GO_TO_TRACE_BUTTON_CLICKED);
    const spanContext = props.spanContexts.find((context) => {
      const id = props.test.contextsSpanCodeObjectIds.find(
        (x) => x === context.spanCodeObjectId
      );

      return context.spanCodeObjectId === id;
    });

    window.sendMessageToDigma<GoToTracePayload>({
      action: actions.GO_TO_TRACE,
      payload: {
        traceId: props.test.traceId,
        displayName: spanContext?.displayName,
        spanCodeObjectId: spanContext?.spanCodeObjectId
      }
    });
  };

  const handleRunButtonClick = () => {
    if (props.test.spanInfo.methodCodeObjectId) {
      sendTrackingEvent(trackingEvents.RUN_TEST_BUTTON_CLICKED);
      window.sendMessageToDigma<RunTestPayload>({
        action: actions.RUN_TEST,
        payload: {
          methodCodeObjectId: props.test.spanInfo.methodCodeObjectId
        }
      });
    }
  };

  const durationString = getDurationString(props.test.duration);

  return (
    <s.Container>
      <s.Header>
        {renderTestResultTag(props.test)}
        <Tooltip title={props.test.name}>
          <s.TestNameLink onClick={handleTestNameClick}>
            {props.test.name}
          </s.TestNameLink>
        </Tooltip>
      </s.Header>
      <s.Content>
        <Tooltip title={props.test.environment}>
          <s.Stat>
            <s.IconContainer>
              <GlobeIcon />
            </s.IconContainer>
            <s.StatValue>{props.test.environment}</s.StatValue>
          </s.Stat>
        </Tooltip>
        <Tooltip title={new Date(props.test.runAt).toString()}>
          <s.Stat>
            <s.IconContainer>
              <TimerIcon size={16} />
            </s.IconContainer>
            <s.StatValue>{formatTimeDistance(props.test.runAt)}</s.StatValue>
          </s.Stat>
        </Tooltip>
        <Tooltip title={durationString}>
          <s.Stat>
            <span>Duration</span>
            <s.StatValue>{durationString}</s.StatValue>
          </s.Stat>
        </Tooltip>
        <s.ButtonsContainer>
          <Tooltip title={"Open ticket info"}>
            <NewButton
              onClick={handleTicketButtonClick}
              icon={JiraLogoIcon}
              buttonType={"tertiary"}
              disabled={props.test.result === "success"}
            />
          </Tooltip>
          <Tooltip title={"Open trace"}>
            <NewButton
              onClick={handleTraceButtonClick}
              icon={TraceIcon}
              buttonType={"tertiary"}
            />
          </Tooltip>
          <NewButton
            label={"Run"}
            icon={PlayIcon}
            buttonType={"secondary"}
            onClick={handleRunButtonClick}
            size={"large"}
            disabled={!props.test.spanInfo.methodCodeObjectId}
          />
        </s.ButtonsContainer>
      </s.Content>
    </s.Container>
  );
};
