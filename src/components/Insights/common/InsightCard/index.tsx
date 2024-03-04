import React, { useState } from "react";
import { isString } from "../../../../typeGuards/isString";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { Link } from "../../../common/Link";
import { TraceIcon } from "../../../common/icons/12px/TraceIcon";
import { HistogramIcon } from "../../../common/icons/16px/HistogramIcon";
import { LiveIcon } from "../../../common/icons/16px/LiveIcon";
import { PinIcon } from "../../../common/icons/16px/PinIcon";
import { RecalculateIcon } from "../../../common/icons/16px/RecalculateIcon";
import { Button } from "../../../common/v3/Button";
import { BaseButtonProps } from "../../../common/v3/Button/types";
import { Card } from "../../../common/v3/Card";
import { JiraButton } from "../../../common/v3/JiraButton";
import { Tooltip } from "../../../common/v3/Tooltip";
import { isSpanInsight } from "../../typeGuards";
import { InsightHeader } from "./InsightHeader";
import * as s from "./styles";
import { InsightCardProps } from "./types";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

export const InsightCard = (props: InsightCardProps) => {
  const [isRecalculatingStarted, setIsRecalculatingStarted] = useState(false);
  const handleRefreshLinkClick = () => {
    props.onRefresh(props.insight.type);
  };

  const handleRecalculateClick = () => {
    props.insight.prefixedCodeObjectId &&
      props.onRecalculate &&
      props.onRecalculate(props.insight.id);
    setIsRecalculatingStarted(true);
  };

  const handleHistogramButtonClick = () => {
    isSpanInsight(props.insight) &&
      props.insight.spanInfo &&
      props.onOpenHistogram &&
      props.onOpenHistogram(
        props.insight.spanInfo.instrumentationLibrary,
        props.insight.spanInfo.name,
        props.insight.type,
        props.insight.spanInfo.displayName
      );
  };

  const renderRecalculationBlock = (
    actualStartTime: string,
    customStartTime: string | null,
    isRecalculatingStarted: boolean
  ) => {
    if (!props.insight.customStartTime && !isRecalculatingStarted) {
      return;
    }

    if (
      isRecalculatingStarted ||
      (customStartTime && customStartTime > actualStartTime)
    ) {
      return (
        <s.RefreshContainer>
          <s.Description>
            Applying the new time filter. Wait a few minutes and then refresh.
          </s.Description>
          <span>
            <Link onClick={handleRefreshLinkClick}>Refresh</Link>
          </span>
        </s.RefreshContainer>
      );
    }

    const areStartTimesEqual =
      customStartTime &&
      new Date(actualStartTime).valueOf() -
        new Date(customStartTime).valueOf() ===
        0;

    if (areStartTimesEqual) {
      const title = new Date(actualStartTime).toString();
      return (
        <s.Description>
          Data from:{" "}
          <Tooltip title={title}>
            <span>{formatTimeDistance(actualStartTime)}</span>
          </Tooltip>
        </s.Description>
      );
    }
  };

  const renderActions = () => {
    const buttonsToRender: {
      tooltip: string;
      button: React.ComponentType<BaseButtonProps>;
    }[] = [];

    props.onOpenHistogram &&
      buttonsToRender.push({
        tooltip: "Open Histogram",
        button: (btnProps) => (
          <Button
            icon={HistogramIcon}
            label={"Histogram"}
            onClick={handleHistogramButtonClick}
            {...btnProps}
          />
        )
      });

    props.insight.isRecalculateEnabled &&
      buttonsToRender.push({
        tooltip: "Recalculate",
        button: (btnProps) => (
          <Button
            icon={RecalculateIcon}
            label={"Recalculate"}
            onClick={handleRecalculateClick}
            {...btnProps}
          />
        )
      });

    props.onJiraButtonClick &&
      buttonsToRender.push({
        tooltip: "Open ticket info",
        button: (btnProps) => (
          <JiraButton
            ticketLink={props.jiraTicketInfo?.ticketLink}
            isHintEnabled={props.jiraTicketInfo?.isHintEnabled}
            spanCodeObjectId={props.jiraTicketInfo?.spanCodeObjectId}
            label={"Ticket"}
            onTicketInfoButtonClick={props.onJiraButtonClick!}
            {...btnProps}
          />
        )
      });

    props.onGoToTrace &&
      buttonsToRender.push({
        tooltip: "Open Trace",
        button: (btnProps) => (
          <Button
            icon={TraceIcon}
            label={"Trace"}
            onClick={() => props.onGoToTrace && props.onGoToTrace()}
            {...btnProps}
          />
        )
      });

    props.onGoToLive &&
      buttonsToRender.push({
        tooltip: "Open live view",
        button: (btnProps) => (
          <Button
            icon={LiveIcon}
            label={"Live"}
            onClick={() => props.onGoToLive && props.onGoToLive()}
            {...btnProps}
          />
        )
      });

    props.onPin &&
      buttonsToRender.push({
        tooltip: "Pin",
        button: (btnProps) => (
          <Button icon={PinIcon} label={"Pin"} {...btnProps} />
        )
      });

    if (buttonsToRender.length === 0) {
      return;
    }

    const toolbarActions = buttonsToRender.slice(0, -1);
    const mainAction = buttonsToRender[buttonsToRender.length - 1];

    return (
      <s.Actions>
        {toolbarActions.map((toolbarAction) => (
          <Tooltip key={toolbarAction.tooltip} title={toolbarAction.tooltip}>
            <toolbarAction.button buttonType={"tertiary"} label={undefined} />
          </Tooltip>
        ))}
        <s.MainActions>
          <mainAction.button buttonType={"primary"} />
        </s.MainActions>
      </s.Actions>
    );
  };

  const isNew = isString(props.insight.firstDetected)
    ? Date.now() - new Date(props.insight.firstDetected).valueOf() <
      IS_NEW_TIME_LIMIT
    : false;
  return (
    <Card
      header={
        <InsightHeader
          isActive={props.isActive}
          isNew={isNew}
          isAsync={props.isAsync}
          insightType={props.insight.type}
          importance={props.insight.importance}
          criticality={props.insight.criticality}
        />
      }
      content={
        <s.ContentContainer>
          {props.insight.actualStartTime &&
            renderRecalculationBlock(
              props.insight.actualStartTime,
              props.insight.customStartTime,
              isRecalculatingStarted
            )}
          {props.content}
        </s.ContentContainer>
      }
      footer={
        <s.InsightFooter>
          {/* <Button icon={CrossIcon} label={"Dismiss"} buttonType={"tertiary"} /> */}
          {renderActions()}
        </s.InsightFooter>
      }
    />
  );
};
