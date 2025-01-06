import type { MouseEvent } from "react";
import { ChevronIcon } from "../../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import * as s from "./styles";
import type { ReportWidgetProps } from "./types";

export const ReportWidget = ({
  title,
  route,
  backgroundImage,
  isEnabled
}: ReportWidgetProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isEnabled) {
      e.preventDefault();
    }
  };

  return (
    <s.Link to={route} onClick={handleClick} $isEnabled={isEnabled}>
      <s.Background src={backgroundImage} />
      <s.TitleContainer>
        <s.Title>{title}</s.Title>
        <s.ChevronIconContainer>
          <ChevronIcon
            size={20}
            color={"currentColor"}
            direction={Direction.RIGHT}
          />
        </s.ChevronIconContainer>
      </s.TitleContainer>
    </s.Link>
  );
};
