import { useState } from "react";
import { useTheme } from "styled-components";
import { PERCENTILES } from "../../../constants";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
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
  const [isRecalculatingStarted, setIsRecalculatingStarted] = useState(false);

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
      setIsRecalculatingStarted(true);
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
    props.onRefresh(props.data.type);
  };

  const renderRecalculationBlock = (
    actualStartTime: string,
    customStartTime: string | null
  ) => {
    const areStartTimesEqual =
      customStartTime &&
      new Date(actualStartTime).valueOf() -
        new Date(customStartTime).valueOf() ===
        0;

    return (
      <>
        {areStartTimesEqual ? (
          <Description>
            Data from: {formatTimeDistance(actualStartTime)}
          </Description>
        ) : (
          <s.RefreshContainer>
            <Description>
              Applying the new time filter. Wait a few minutes and then refresh.
            </Description>
            <span>
              <Link onClick={handleRefreshLinkClick}>Refresh</Link>
            </span>
          </s.RefreshContainer>
        )}
      </>
    );
  };

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
            {props.isAsync && <s.AsyncBadge>Async</s.AsyncBadge>}
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
                <PopoverContent className={"Popover"} width={"max-content"}>
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
          {props.data.actualStartTime &&
            (props.data.customStartTime || isRecalculatingStarted) &&
            renderRecalculationBlock(
              props.data.actualStartTime,
              props.data.customStartTime
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
        </>
      }
      buttons={props.buttons}
    />
  );
};
