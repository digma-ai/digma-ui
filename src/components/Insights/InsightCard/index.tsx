import { useState } from "react";
import { useTheme } from "styled-components";
import { getInsightImportanceColor } from "../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { KebabMenuButton } from "../../common/KebabMenuButton";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
import * as s from "./styles";
import { InsightCardProps } from "./types";

export const InsightCard = (props: InsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

  const theme = useTheme();
  const insightTypeInfo = getInsightTypeInfo(props.data.type);
  const insightIconColor = getInsightImportanceColor(
    props.data.importance,
    theme
  );

  const handleKebabMenuButtonToggle = () => {
    setIsKebabMenuOpen(!isKebabMenuOpen);
  };

  const handleKebabMenuItemSelect = (value: string) => {
    if (value === "recalculate") {
      // TODO
      console.log("Recalculate");
    }

    handleKebabMenuButtonToggle();
  };

  const handleExpandButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <s.Container>
      <s.TitleRow>
        <s.Title>
          <s.InsightIconContainer>
            {insightTypeInfo && (
              <insightTypeInfo.icon color={insightIconColor} size={16} />
            )}
          </s.InsightIconContainer>
          {insightTypeInfo?.label || props.data.type}
        </s.Title>
        <s.Toolbar>
          {props.stats && <s.Stats>{props.stats}</s.Stats>}
          {(props.menuItems || props.data.isRecalculateEnabled) && (
            <Popover
              open={isKebabMenuOpen}
              onOpenChange={setIsKebabMenuOpen}
              placement={"bottom-start"}
            >
              <PopoverTrigger onClick={handleKebabMenuButtonToggle}>
                <KebabMenuButton />
              </PopoverTrigger>
              <PopoverContent className={"Popover"}>
                <Menu
                  items={[
                    ...(props.data.isRecalculateEnabled
                      ? [{ value: "recalculate", label: "Recalculate" }]
                      : []),
                    ...(props.menuItems
                      ? props.menuItems.map((x) => ({ value: x, label: x }))
                      : [])
                  ]}
                  onSelect={handleKebabMenuItemSelect}
                />
              </PopoverContent>
            </Popover>
          )}
          {props.isExpandable && (
            <s.ExpandButton onClick={handleExpandButtonClick}>
              <ChevronIcon
                color={theme.mode === "light" ? "#828797" : "#b9c2eb"}
                direction={isExpanded ? Direction.UP : Direction.DOWN}
                size={12}
              />
            </s.ExpandButton>
          )}
        </s.Toolbar>
      </s.TitleRow>
      {props.content && (
        <s.ContentContainer>{props.content}</s.ContentContainer>
      )}
      {isExpanded && props.expandableContent && (
        <s.ContentContainer>{props.expandableContent}</s.ContentContainer>
      )}
      {props.buttons && (
        <s.ButtonsContainer>{props.buttons}</s.ButtonsContainer>
      )}
    </s.Container>
  );
};
