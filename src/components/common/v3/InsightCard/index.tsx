import { NewButton } from "../../NewButton";
import { TraceIcon } from "../../icons/12px/TraceIcon";
import { HistogramIcon } from "../../icons/16px/HistogramIcon";
import { JiraLogoIcon } from "../../icons/16px/JiraLogoIcon";
import { LiveIcon } from "../../icons/16px/LiveIcon";
import { PinIcon } from "../../icons/16px/PinIcon";
import { RecalculateIcon } from "../../icons/16px/RecalculateIcon";
import { CrossIcon } from "../../icons/CrossIcon";
import { Card } from "../Card";
import { InsightHeader } from "../InsightHeader";
import * as s from "./styles";
import { InsightCardProps } from "./types";

export const InsightCard = (props: InsightCardProps) => {
  return (
    <Card
      header={
        <InsightHeader
          isActive={props.isActive}
          isNew={props.isNew}
          isAsync={props.isAsync}
          insightType={props.insight.type}
          importance={props.insight.importance}
        />
      }
      content={props.content}
      footer={
        <s.InsightFooter>
          <s.DismissButton
            icon={CrossIcon}
            label="Dismiss"
            buttonType="tertiary"
          />
          <s.Actions>
            {props.onOpenHistogram && (
              <NewButton buttonType="tertiary" icon={HistogramIcon} />
            )}
            {props.onRecalculate && (
              <NewButton buttonType="tertiary" icon={RecalculateIcon} />
            )}
            {props.onOpenJiraTicket && (
              <NewButton buttonType="tertiary" icon={JiraLogoIcon} />
            )}
            {props.onPin && <NewButton buttonType="tertiary" icon={PinIcon} />}
            <s.MainActions>
              <NewButton icon={TraceIcon} label="Trace" />
              <NewButton icon={LiveIcon} label="Live" />
            </s.MainActions>
          </s.Actions>
        </s.InsightFooter>
      }
    />
  );
};
