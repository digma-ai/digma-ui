import { useState } from "react";
import { useTheme } from "styled-components";
import { PERCENTILES } from "../../../constants";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getInsightImportanceColor } from "../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { Badge } from "../../common/Badge";
import { Card } from "../../common/Card";
import { KebabMenuButton } from "../../common/KebabMenuButton";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { Toggle } from "../../common/Toggle";
import { ToggleValue } from "../../common/Toggle/types";
import { Tooltip } from "../../common/Tooltip";
import { JiraLogoIcon } from "../../common/icons/16px/JiraLogoIcon";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
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

  const handlePercentileToggleValueChange = (value: ToggleValue) => {
    if (value !== percentileViewMode) {
      setPercentileViewMode(value as number);
      props.onPercentileViewModeChange &&
        props.onPercentileViewModeChange(value as number);
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

    const title = new Date(actualStartTime).toString();

    return (
      <>
        {areStartTimesEqual ? (
          <Description>
            Data from:{" "}
            <Tooltip title={title}>
              <span>{formatTimeDistance(actualStartTime)}</span>
            </Tooltip>
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

            {props.data.ticketLink &&
              <s.TicketIconContainer title="Open ticket link" onClick={() => props.data.ticketLink && openURLInDefaultBrowser(props.data.ticketLink)}>
                <JiraLogoIcon size={16} />
              </s.TicketIconContainer>
            }
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
                  size={14}
                />
              </s.ExpandButton>
            )}
          </s.Toolbar>
        </>
      }
      content={
        <>
          {props.onPercentileViewModeChange && (
            <Toggle
              options={PERCENTILES.map((percentile) => ({
                value: percentile.percentile,
                label: percentile.label
              }))}
              value={percentileViewMode}
              onValueChange={handlePercentileToggleValueChange}
            />
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
