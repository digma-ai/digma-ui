import { useState } from "react";
import { isString } from "../../../../typeGuards/isString";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { IconButton } from "../../../Insights/common/InsightCard/IconButton";
import { Link } from "../../Link";
import { TraceIcon } from "../../icons/12px/TraceIcon";
import { HistogramIcon } from "../../icons/16px/HistogramIcon";
import { JiraLogoIcon } from "../../icons/16px/JiraLogoIcon";
import { LiveIcon } from "../../icons/16px/LiveIcon";
import { PinIcon } from "../../icons/16px/PinIcon";
import { RecalculateIcon } from "../../icons/16px/RecalculateIcon";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "../Button";
import { Card } from "../Card";
import { InsightHeader } from "../InsightHeader";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { InsightCardProps } from "./types";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

export const InsightCard = (props: InsightCardProps) => {
  const [isRecalculatingStarted, setIsRecalculatingStarted] = useState(false);
  const handleRefreshLinkClick = () => {
    props.onRefresh && props.onRefresh(props.insight.type);
  };

  const handleRecalculateClick = () => {
    props.insight.prefixedCodeObjectId &&
      props.onRecalculate &&
      props.onRecalculate(
        props.insight.prefixedCodeObjectId,
        props.insight.type
      );
    setIsRecalculatingStarted(true);
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
          <Button icon={CrossIcon} label="Dismiss" buttonType="tertiary" />
          <s.Actions>
            {props.onOpenHistogram && (
              <IconButton icon={{ component: HistogramIcon }} />
            )}
            {props.onRecalculate && (
              <IconButton
                icon={{ component: RecalculateIcon }}
                onClick={handleRecalculateClick}
              />
            )}
            {props.onOpenJiraTicket && (
              <IconButton icon={{ component: JiraLogoIcon }} />
            )}
            {props.onPin && <IconButton icon={{ component: PinIcon }} />}
            <s.MainActions>
              {props.onGoToTrace && (
                <Button
                  icon={TraceIcon}
                  label="Trace"
                  onClick={() => props.onGoToTrace && props.onGoToTrace()}
                />
              )}
              {props.onGoToLive && (
                <Button
                  icon={LiveIcon}
                  label="Live"
                  onClick={() => props.onGoToLive && props.onGoToLive()}
                />
              )}
            </s.MainActions>
          </s.Actions>
        </s.InsightFooter>
      }
    />
  );
};
