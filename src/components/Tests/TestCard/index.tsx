import { isString } from "../../../typeGuards/isString";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
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
import { Test } from "../types";
import * as s from "./styles";
import { TestCardProps } from "./types";

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
    window.sendMessageToDigma({
      action: actions.GO_TO_SPAN_OF_TEST,
      payload: {
        environment: props.test.environmentId,
        spanCodeObjectId: props.test.spanInfo.spanCodeObjectId,
        methodCodeObjectId: props.test.spanInfo.methodCodeObjectId
      }
    });
  };

  const handleTicketButtonClick = () => {
    props.onTicketInfoOpen(props.test);
  };

  const handleTraceButtonClick = () => {
    const spanContext = props.spanContexts.find((context) => {
      const id = props.test.contextsSpanCodeObjectIds.find(
        (x) => x === context.spanCodeObjectId
      );

      return context.spanCodeObjectId === id;
    });

    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        traceId: props.test.traceId,
        displayName: spanContext?.displayName,
        spanCodeObjectId: spanContext?.spanCodeObjectId
      }
    });
  };

  const handleRunButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.RUN_TEST,
      payload: {
        methodCodeObjectId: props.test.spanInfo.methodCodeObjectId
      }
    });
  };

  const durationString = `${props.test.duration.value} ${props.test.duration.unit}`;

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
        <s.Stat>
          <s.IconContainer>
            <GlobeIcon />
          </s.IconContainer>
          <Tooltip title={props.test.environment}>
            <s.StatValue>{props.test.environment}</s.StatValue>
          </Tooltip>
        </s.Stat>
        <s.Stat>
          <s.IconContainer>
            <TimerIcon />
          </s.IconContainer>
          <Tooltip title={new Date(props.test.runAt).toString()}>
            <s.StatValue>{formatTimeDistance(props.test.runAt)}</s.StatValue>
          </Tooltip>
        </s.Stat>
        <s.Stat>
          <span>Duration</span>
          <Tooltip title={durationString}>
            <s.StatValue>{durationString}</s.StatValue>
          </Tooltip>
        </s.Stat>
        <s.ButtonsContainer>
          <NewButton
            onClick={handleTicketButtonClick}
            icon={JiraLogoIcon}
            buttonType={"tertiary"}
            disabled={props.test.result === "success"}
          />
          <NewButton
            onClick={handleTraceButtonClick}
            icon={TraceIcon}
            buttonType={"tertiary"}
          />
          <NewButton
            label={"Run"}
            icon={PlayIcon}
            buttonType={"secondary"}
            onClick={handleRunButtonClick}
            size={"large"}
          />
        </s.ButtonsContainer>
      </s.Content>
    </s.Container>
  );
};
