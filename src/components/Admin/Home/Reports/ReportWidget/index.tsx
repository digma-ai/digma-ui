import type { MouseEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { ChevronIcon } from "../../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import type { ReportWidgetProps } from "./types";

export const ReportWidget = ({
  title,
  route,
  backgroundImage,
  isEnabled,
  id
}: ReportWidgetProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    sendUserActionTrackingEvent(trackingEvents.REPORT_WIDGET_CLICKED, {
      report: title
    });

    if (!isEnabled) {
      e.preventDefault();
    }
  };

  return (
    <s.Link
      className={"report-widget"}
      data-id={id}
      to={route}
      onClick={handleClick}
      $isEnabled={isEnabled}
    >
      <s.Background src={backgroundImage} $isEnabled={isEnabled} />
      <s.TitleContainer>
        <s.Title>{title}</s.Title>
        {!isEnabled && <s.SoonBadge>Coming soon</s.SoonBadge>}
        <s.ChevronIconContainer>
          <ChevronIcon
            size={20}
            color={"currentColor"}
            direction={Direction.Right}
          />
        </s.ChevronIconContainer>
      </s.TitleContainer>
    </s.Link>
  );
};
