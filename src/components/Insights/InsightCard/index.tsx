import { useState } from "react";
import { useTheme } from "styled-components";
import { PERCENTILES } from "../../../constants";
import { getInsightImportanceColor } from "../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { KebabMenuButton } from "../../common/KebabMenuButton";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { Link } from "../styles";
import * as s from "./styles";
import { InsightCardProps } from "./types";

const RECALCULATE = "recalculate";
const DEFAULT_PERCENTILE = 0.5;

export const InsightCard = (props: InsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);

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
    if (value === RECALCULATE) {
      props.data.prefixedCodeObjectId &&
        props.onRecalculate &&
        props.onRecalculate(props.data.prefixedCodeObjectId, props.data.type);
    }

    handleKebabMenuButtonToggle();
  };

  const handleExpandButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDurationPercentileToggleOptionClick = (value: number) => {
    if (value !== percentileViewMode) {
      setPercentileViewMode(value);
      props.onPercentileViewModeChange &&
        props.onPercentileViewModeChange(value);
    }
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
          {props.onPercentileViewModeChange && (
            <s.PercentileViewModeToggle>
              {PERCENTILES.map((percentile) => (
                <s.PercentileViewModeToggleOption
                  key={percentile.percentile}
                  selected={percentile.percentile === percentileViewMode}
                  onClick={() =>
                    handleDurationPercentileToggleOptionClick(
                      percentile.percentile
                    )
                  }
                >
                  {percentile.label}
                </s.PercentileViewModeToggleOption>
              ))}
            </s.PercentileViewModeToggle>
          )}
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
                      ? [{ value: RECALCULATE, label: "Recalculate" }]
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
          {props.expandableContent && (
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
      {props.expandableContent && (
        <Link onClick={handleExpandButtonClick}>
          Show {isExpanded ? "less" : "more"}
        </Link>
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
