import { useState } from "react";
import { useTheme } from "styled-components";
import { PERCENTILES } from "../../../constants";
import { getInsightImportanceColor } from "../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { Badge } from "../../common/Badge";
import { KebabMenuButton } from "../../common/KebabMenuButton";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { Card } from "../Card";
import { Description, Link } from "../styles";
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
        props.onRecalculate(props.data.prefixedCodeObjectId, props.data.type);
    }

    handleKebabMenuButtonToggle();
  };

  const handleExpandButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDurationPercentileToggleOptionButtonClick = (value: number) => {
    if (value !== percentileViewMode) {
      setPercentileViewMode(value);
      props.onPercentileViewModeChange &&
        props.onPercentileViewModeChange(value);
    }
  };

  const handleRefreshLinkClick = () => {
    props.onRefresh();
  };
  const areStartTimesEqual = Boolean(
    props.data.actualStartTime &&
      props.data.customStartTime &&
      new Date(props.data.actualStartTime).valueOf() -
        new Date(props.data.customStartTime).valueOf() ===
        0
  );

  return (
    <Card
      header={
        <>
          <s.Title>
            <s.InsightIconContainer>
              {props.isRecent && (
                <s.BadgeContainer>
                  <Badge />
                </s.BadgeContainer>
              )}
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
                  <s.PercentileViewModeToggleOptionButton
                    key={percentile.percentile}
                    selected={percentile.percentile === percentileViewMode}
                    onClick={() =>
                      handleDurationPercentileToggleOptionButtonClick(
                        percentile.percentile
                      )
                    }
                  >
                    {percentile.label}
                  </s.PercentileViewModeToggleOptionButton>
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
        </>
      }
      content={
        <>
          {!areStartTimesEqual && (
            <s.RefreshContainer>
              <Description>
                Applying the new time filter. Wait a few minutes and then
                refresh.
              </Description>
              <span>
                <Link onClick={handleRefreshLinkClick}>Refresh</Link>
              </span>
            </s.RefreshContainer>
          )}
          {props.content && (
            <s.ContentContainer>{props.content}</s.ContentContainer>
          )}
          {props.expandableContent && (
            <span>
              <Link onClick={handleExpandButtonClick}>
                Show {isExpanded ? "less" : "more"}
              </Link>
            </span>
          )}
          {isExpanded && props.expandableContent && (
            <s.ContentContainer>{props.expandableContent}</s.ContentContainer>
          )}
          {props.buttons && (
            <s.ButtonsContainer>{props.buttons}</s.ButtonsContainer>
          )}
        </>
      }
    />
  );
};
