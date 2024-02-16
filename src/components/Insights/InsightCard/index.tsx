import { useContext, useState } from "react";
import { useTheme } from "styled-components";
import { actions } from "../../../actions";
import { PERCENTILES } from "../../../constants";
import { isString } from "../../../typeGuards/isString";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getInsightImportanceColor } from "../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Badge } from "../../common/Badge";
import { Card } from "../../common/Card";
import { KebabMenuButton } from "../../common/KebabMenuButton";
import { Menu } from "../../common/Menu";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { Tag } from "../../common/Tag";
import { Toggle } from "../../common/Toggle";
import { ToggleValue } from "../../common/Toggle/types";
import { Tooltip } from "../../common/Tooltip";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { InfoCircleIcon } from "../../common/icons/InfoCircleIcon";
import { OpenTelemetryLogoSmallIcon } from "../../common/icons/OpenTelemetryLogoSmallIcon";
import { Direction } from "../../common/icons/types";
import { Description, Link } from "../styles";
import * as s from "./styles";
import { InsightCardProps } from "./types";

const RECALCULATE = "recalculate";
const DEFAULT_PERCENTILE = 0.5;
const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

export const InsightCard = (props: InsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);
  const [isRecalculatingStarted, setIsRecalculatingStarted] = useState(false);
  const { scope } = useContext(ConfigContext);

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
    customStartTime: string | null,
    isRecalculatingStarted: boolean
  ) => {
    if (!props.data.customStartTime && !isRecalculatingStarted) {
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

  const isNew = isString(props.data.firstDetected)
    ? Date.now() - new Date(props.data.firstDetected).valueOf() <
      IS_NEW_TIME_LIMIT
    : false;

  const handleLinkClick = (spanCodeObjectId?: string) => {
    if (spanCodeObjectId) {
      window.sendMessageToDigma({
        action: actions.CHANGE_SCOPE,
        payload: {
          span: spanCodeObjectId ? { spanCodeObjectId } : null
        }
      });
    }
  };

  return (
    <>
      <Card
        showTitle={!!(props.spanInfo?.displayName && !scope?.span)}
        title={
          <s.Title>
            <s.TitleIcon>
              <OpenTelemetryLogoSmallIcon color="#6063F6" size={16} />
            </s.TitleIcon>
            <s.Link
              onClick={() => handleLinkClick(props.spanInfo?.spanCodeObjectId)}
            >
              {props.spanInfo?.displayName}
            </s.Link>
          </s.Title>
        }
        header={
          <>
            <s.Header>
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
              renderRecalculationBlock(
                props.data.actualStartTime,
                props.data.customStartTime,
                isRecalculatingStarted
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
    </>
  );
};
