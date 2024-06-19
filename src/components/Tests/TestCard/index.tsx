import { isString } from "../../../typeGuards/isString";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatEnvironmentName } from "../../../utils/formatEnvironmentName";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getDurationString } from "../../../utils/getDurationString";
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
import { GoToTracePayload, RunTestPayload, TestCardProps } from "./types";

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

export const TestCard = ({
  test,
  onTicketInfoOpen,
  spanContexts
}: TestCardProps) => {
  const handleTestNameClick = () => {
    sendUserActionTrackingEvent(trackingEvents.TEST_NAME_LINK_CLICKED);

    changeScope({
      span: {
        spanCodeObjectId: test.spanInfo.spanCodeObjectId
      },
      environmentId: test.environmentId,
      context: {
        event: "TESTS/TEST_CARD_TITLE_LINK_CLICKED"
      }
    });
  };

  const handleTicketButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED);
    onTicketInfoOpen(test);
  };

  const handleTraceButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.GO_TO_TRACE_BUTTON_CLICKED);
    const spanContext = spanContexts.find((context) => {
      const id = test.contextsSpanCodeObjectIds.find(
        (x) => x === context.spanCodeObjectId
      );

      return context.spanCodeObjectId === id;
    });

    window.sendMessageToDigma<GoToTracePayload>({
      action: actions.GO_TO_TRACE,
      payload: {
        traceId: test.traceId,
        displayName: spanContext?.displayName,
        spanCodeObjectId: spanContext?.spanCodeObjectId
      }
    });
  };

  const handleRunButtonClick = () => {
    if (test.spanInfo.methodCodeObjectId) {
      sendTrackingEvent(trackingEvents.RUN_TEST_BUTTON_CLICKED);
      window.sendMessageToDigma<RunTestPayload>({
        action: actions.RUN_TEST,
        payload: {
          methodCodeObjectId: test.spanInfo.methodCodeObjectId
        }
      });
    }
  };

  const durationString = getDurationString(test.duration);
  const environmentName = formatEnvironmentName(test.environment);
  const testName = test.name;
  const runAt = test.runAt;

  return (
    <s.Container>
      <s.Header>
        {renderTestResultTag(test)}
        <Tooltip title={testName}>
          <s.TestNameLink onClick={handleTestNameClick}>
            {testName}
          </s.TestNameLink>
        </Tooltip>
      </s.Header>
      <s.Content>
        <Tooltip title={environmentName}>
          <s.Stat>
            <s.IconContainer>
              <GlobeIcon />
            </s.IconContainer>
            <s.StatValue>{environmentName}</s.StatValue>
          </s.Stat>
        </Tooltip>
        <Tooltip title={new Date(runAt).toString()}>
          <s.Stat>
            <s.IconContainer>
              <TimerIcon size={16} />
            </s.IconContainer>
            <s.StatValue>{formatTimeDistance(runAt)}</s.StatValue>
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
              disabled={test.result === "success"}
            />
          </Tooltip>
          <Tooltip title={"Open Trace"}>
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
            disabled={!test.spanInfo.methodCodeObjectId}
          />
        </s.ButtonsContainer>
      </s.Content>
    </s.Container>
  );
};
