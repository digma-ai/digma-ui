import { useState } from "react";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { ChevronIcon } from "../../../common/icons/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import * as s from "./styles";
import type { SectionProps } from "./types";

const getChevronIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#494b57";
    case "dark":
    case "dark-jetbrains":
      return "#dfe1e5";
  }
};

/**
 * @deprecated
 * safe to delete after 2024-07-22
 */
export const Section = ({
  isExpanded,
  number,
  title,
  children
}: SectionProps) => {
  const theme = useTheme();
  const [isSectionExpanded, setIsSectionExpanded] = useState(isExpanded);

  const handleExpandButtonClick = () => {
    setIsSectionExpanded(!isExpanded);
  };

  return (
    <s.Container>
      <s.HeaderButton onClick={handleExpandButtonClick}>
        <s.Header>
          <s.Number>{number}</s.Number>
          <s.Title>{title}</s.Title>
        </s.Header>
        <ChevronIcon
          color={getChevronIconColor(theme)}
          direction={isSectionExpanded ? Direction.Up : Direction.Down}
          size={14}
        />
      </s.HeaderButton>
      {isSectionExpanded && children}
    </s.Container>
  );
};
