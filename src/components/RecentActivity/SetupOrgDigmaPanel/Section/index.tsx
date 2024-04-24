import { useState } from "react";
import { useTheme } from "styled-components";
import { ChevronIcon } from "../../../common/icons/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import * as s from "./styles";
import { SectionProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-07-22
 */
export const Section = (props: SectionProps) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(props.isExpanded);

  const handleExpandButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <s.Container>
      <s.HeaderButton onClick={handleExpandButtonClick}>
        <s.Header>
          <s.Number>{props.number}</s.Number>
          <s.Title>{props.title}</s.Title>
        </s.Header>
        <ChevronIcon
          color={theme.mode === "light" ? "#494b57" : "#dfe1e5"}
          direction={isExpanded ? Direction.UP : Direction.DOWN}
          size={14}
        />
      </s.HeaderButton>
      {isExpanded && props.children}
    </s.Container>
  );
};
