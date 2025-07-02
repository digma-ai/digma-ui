import { useState } from "react";
import { ChevronIcon } from "../../../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../../../common/icons/types";
import * as s from "./styles";
import type { AccordionProps } from "./types";

export const Accordion = ({ summary, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSummaryClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <s.Container>
      <s.Summary onClick={handleSummaryClick}>
        <s.IconContainer>
          <ChevronIcon
            color={"currentColor"}
            size={16}
            direction={isOpen ? Direction.Right : Direction.Down}
          />
        </s.IconContainer>
        {summary}
      </s.Summary>
      {isOpen && <s.Content>{content}</s.Content>}
    </s.Container>
  );
};
