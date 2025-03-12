import { useContext, useState } from "react";
import { PERCENTILES } from "../../../../../constants";
import { isString } from "../../../../../typeGuards/isString";
import { ScopeChangeEvent } from "../../../../../types";
import { changeScope } from "../../../../../utils/actions/changeScope";
import { formatTimeDistance } from "../../../../../utils/formatTimeDistance";
import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { Badge } from "../../../../common/Badge";
import { Card } from "../../../../common/Card";
import { KebabMenuButton } from "../../../../common/KebabMenuButton";
import { Menu } from "../../../../common/Menu";
import { Popover } from "../../../../common/Popover";
import { PopoverContent } from "../../../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../../../common/Popover/PopoverTrigger";
import { Tag } from "../../../../common/Tag";
import { Toggle } from "../../../../common/Toggle";
import type { ToggleValue } from "../../../../common/Toggle/types";
import { Tooltip } from "../../../../common/Tooltip";
import { OpenTelemetryLogoIcon } from "../../../../common/icons/12px/OpenTelemetryLogoIcon";
import { ChevronIcon } from "../../../../common/icons/ChevronIcon";
import { InfoCircleIcon } from "../../../../common/icons/InfoCircleIcon";
import { Direction } from "../../../../common/icons/types";
import { Description, Link } from "../../../styles";
import * as s from "./styles";
import type { InsightCardProps } from "./types";

const RECALCULATE = "recalculate";
const DEFAULT_PERCENTILE = 0.5;
const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

/**
 * @deprecated
 * safe to delete after the implementation of all the deprecated insight cards with new UI
 */
export const InsightCard = ({
  data,
  onRecalculate,
  onPercentileViewModeChange,
  onRefresh,
  spanInfo,
  isRecent,
  isAsync,
  menuItems,
  stats,
  expandableContent,
  content,
  buttons
}: InsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);
  const [isRecalculatingStarted, setIsRecalculatingStarted] = useState(false);
  const { scope } = useContext(ConfigContext);

  const insightTypeInfo = getInsightTypeInfo(data.type);

  const handleKebabMenuButtonToggle = () => {
    setIsKebabMenuOpen(!isKebabMenuOpen);
  };

  const handleKebabMenuItemSelect = (value: string) => {
    if (value === RECALCULATE) {
      onRecalculate(data.id, data.type);
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
      if (onPercentileViewModeChange) {
        onPercentileViewModeChange(value as number);
      }
    }
  };

  const handleRefreshLinkClick = () => {
    onRefresh(data.type);
  };

  const renderRecalculationBlock = (
    actualStartTime: string,
    customStartTime: string | null,
    isRecalculatingStarted: boolean
  ) => {
    if (!data.customStartTime && !isRecalculatingStarted) {
      return;
    }

    if (
      isRecalculatingStarted ||
      (customStartTime && customStartTime > actualStartTime)
    ) {
      return (
        <s.RefreshContainer>
          <Description>
            Applying the new time filter. Wait a few minutes and then refresh.
          </Description>
          <span>
            <Link onClick={handleRefreshLinkClick}>Refresh</Link>
          </span>
        </s.RefreshContainer>
      );
    }

    const areStartTimesEqual =
      customStartTime &&
      new Date(actualStartTime).valueOf() -
        new Date(customStartTime).valueOf() ===
        0;

    if (areStartTimesEqual) {
      const title = new Date(actualStartTime).toString();
      return (
        <Description>
          Data from:{" "}
          <Tooltip title={title}>
            <span>{formatTimeDistance(actualStartTime)}</span>
          </Tooltip>
        </Description>
      );
    }
  };

  const isNew = isString(data.firstDetected)
    ? Date.now() - new Date(data.firstDetected).valueOf() < IS_NEW_TIME_LIMIT
    : false;

  const handleTitleLinkClick = () => {
    if (spanInfo) {
      changeScope({
        span: {
          spanCodeObjectId: spanInfo.spanCodeObjectId
        },
        context: {
          event: ScopeChangeEvent.InsightsInsightCardAssetLinkClicked
        }
      });
    }
  };

  return (
    <>
      <Card
        showTitle={Boolean(!scope?.span && spanInfo)}
        title={
          <s.Title>
            <s.TitleIconContainer>
              <OpenTelemetryLogoIcon color={"currentColor"} />
            </s.TitleIconContainer>
            <Tooltip title={spanInfo?.displayName}>
              <s.TitleLink onClick={handleTitleLinkClick}>
                {spanInfo?.displayName}
              </s.TitleLink>
            </Tooltip>
          </s.Title>
        }
        header={
          <>
            <s.Header>
              <s.InsightIconContainer $importance={data.importance}>
                {isRecent && (
                  <s.BadgeContainer>
                    <Badge />
                  </s.BadgeContainer>
                )}
                {insightTypeInfo && (
                  <insightTypeInfo.icon color={"currentColor"} size={16} />
                )}
              </s.InsightIconContainer>
              {insightTypeInfo?.label ?? data.type}
              {insightTypeInfo?.description && (
                <Tooltip title={<insightTypeInfo.description />}>
                  <s.InfoContainer>
                    <InfoCircleIcon color={"currentColor"} size={16} />
                  </s.InfoContainer>
                </Tooltip>
              )}
            </s.Header>
            <s.Toolbar>
              {isNew && <Tag type={"success"} value={"New"} />}
              {isAsync && <s.AsyncBadge>Async</s.AsyncBadge>}
              {stats && <s.Stats>{stats}</s.Stats>}
              {(menuItems ?? data.isRecalculateEnabled) && (
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
                        ...(data.isRecalculateEnabled
                          ? [{ value: RECALCULATE, label: "Recalculate" }]
                          : []),
                        ...(menuItems
                          ? menuItems.map((x) => ({ value: x, label: x }))
                          : [])
                      ]}
                      onSelect={handleKebabMenuItemSelect}
                    />
                  </PopoverContent>
                </Popover>
              )}
              {expandableContent && (
                <s.ExpandButton onClick={handleExpandButtonClick}>
                  <ChevronIcon
                    color={"currentColor"}
                    direction={isExpanded ? Direction.Up : Direction.Down}
                    size={14}
                  />
                </s.ExpandButton>
              )}
            </s.Toolbar>
          </>
        }
        content={
          <>
            {onPercentileViewModeChange && (
              <Toggle
                options={PERCENTILES.map((percentile) => ({
                  value: percentile.percentile,
                  label: percentile.label
                }))}
                value={percentileViewMode}
                onValueChange={handlePercentileToggleValueChange}
              />
            )}
            {data.actualStartTime &&
              renderRecalculationBlock(
                data.actualStartTime,
                data.customStartTime,
                isRecalculatingStarted
              )}
            {content && <s.ContentContainer>{content}</s.ContentContainer>}
            {expandableContent && (
              <span>
                <Link onClick={handleExpandButtonClick}>
                  Show {isExpanded ? "less" : "more"}
                </Link>
              </span>
            )}
            {isExpanded && expandableContent && (
              <s.ContentContainer>{expandableContent}</s.ContentContainer>
            )}
          </>
        }
        buttons={buttons}
      />
    </>
  );
};
