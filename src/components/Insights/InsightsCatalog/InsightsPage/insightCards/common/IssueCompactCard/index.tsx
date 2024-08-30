import { useState } from "react";
import { useTheme } from "styled-components";
import { useConfigSelector } from "../../../../../../../store/config/useConfigSelector";
import { sendUserActionTrackingEvent } from "../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../../../../utils/getInsightTypeInfo";
import { CrossIcon } from "../../../../../../common/icons/16px/CrossIcon";
import { EyeIcon } from "../../../../../../common/icons/16px/EyeIcon";
import { FourPointedStarWithPlusesIcon } from "../../../../../../common/icons/16px/FourPointedStarWithPlusesIcon";
import { JiraLogoIcon } from "../../../../../../common/icons/16px/JiraLogoIcon";
import { RecheckIcon } from "../../../../../../common/icons/16px/RecheckIcon";
import { TraceIcon } from "../../../../../../common/icons/16px/TraceIcon";
import { ThreeDotsIcon } from "../../../../../../common/icons/ThreeDotsIcon";
import { NewPopover } from "../../../../../../common/NewPopover";
import { Link } from "../../../../../../common/v3/Link";
import { NewIconButton } from "../../../../../../common/v3/NewIconButton";
import { Tag } from "../../../../../../common/v3/Tag";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import { MenuList } from "../../../../../../Navigation/common/MenuList";
import { MenuItem } from "../../../../../../Navigation/common/MenuList/types";
import { trackingEvents } from "../../../../../tracking";
import { isEndpointInsight, isSpanInsight } from "../../../../../typeGuards";
import { InsightIcon } from "../InsightCard/InsightHeader/InsightIcon";
import { KeyValue } from "../InsightCard/InsightHeader/InsightStatusTooltipContent/KeyValue";
import { getInsightStatusInfo } from "../InsightStatusBadge/getInsightStatusInfo";
import * as s from "./styles";
import { IssueCompactCardProps } from "./types";

export const IssueCompactCard = ({
  insight,
  metric,
  onGoToSpan,
  onGoToTrace,
  onDismiss,
  onShow,
  onRecheck,
  onMarkAsRead,
  onTicketOpen,
  isCritical
}: IssueCompactCardProps) => {
  const theme = useTheme();
  const { isJaegerEnabled } = useConfigSelector();
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const insightTypeInfo = getInsightTypeInfo(insight.type, insight.subType);
  const statusInfo = insight.status
    ? getInsightStatusInfo(insight.status, theme)
    : undefined;
  const spanInfo =
    isSpanInsight(insight) || isEndpointInsight(insight)
      ? insight.spanInfo
      : undefined;
  const isTicketLinkAttached = Boolean(insight.ticketLink);
  const handleContainerClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ISSUE_CARD_CLICKED, {
      insightType: insight.type
    });

    if (insight.isReadable && insight.isRead === false) {
      onMarkAsRead();
    }
  };

  const handleSpanLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUE_CARD_TITLE_ASSET_LINK_CLICKED,
      {
        insightType: insight.type
      }
    );
    onGoToSpan();
  };

  const handleMenuItemClick = (item: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUE_CARD_KEBAB_MENU_ITEM_CLICKED,
      { item }
    );
    switch (item) {
      case "details":
        onGoToSpan();
        break;
      case "trace":
        onGoToTrace && onGoToTrace();
        break;
      case "dismiss":
        onDismiss();
        break;
      case "show":
        onShow();
        break;
      case "ticket":
        onTicketOpen();
        break;
      case "recheck":
        onRecheck();
        break;
    }
    setIsKebabMenuOpen(false);
  };

  const menuItems: MenuItem[] = [
    {
      id: "details",
      icon: <FourPointedStarWithPlusesIcon size={16} color={"currentColor"} />,
      label: "Details",
      onClick: () => handleMenuItemClick("details")
    },
    ...(isJaegerEnabled && onGoToTrace
      ? [
          {
            id: "trace",
            icon: <TraceIcon size={16} color={"currentColor"} />,
            label: "Trace",
            onClick: () => handleMenuItemClick("trace")
          }
        ]
      : []),
    ...(insight.isDismissed
      ? [
          {
            id: "show",
            icon: <EyeIcon size={16} color={"currentColor"} />,
            label: "Show",
            onClick: () => handleMenuItemClick("show")
          }
        ]
      : [
          {
            id: "dismiss",
            icon: <CrossIcon size={16} color={"currentColor"} />,
            label: "Dismiss",
            onClick: () => handleMenuItemClick("dismiss")
          }
        ]),
    {
      id: "ticket",
      icon: (
        <JiraLogoIcon
          size={16}
          color={
            isTicketLinkAttached
              ? theme.colors.v3.icon.brandSecondary
              : "currentColor"
          }
          isActive={isTicketLinkAttached}
        />
      ),
      label: "Ticket",
      onClick: () => handleMenuItemClick("ticket")
    },
    {
      id: "recheck",
      icon: <RecheckIcon size={16} color={"currentColor"} />,
      label: "Recheck",
      onClick: () => handleMenuItemClick("recheck")
    }
  ];

  return (
    <s.Container
      $isCritical={isCritical}
      $isRead={insight.isRead}
      onClick={handleContainerClick}
    >
      <s.TitleRow>
        {insightTypeInfo && (
          <InsightIcon
            insightTypeInfo={insightTypeInfo}
            criticality={insight.criticality}
          />
        )}
        <s.Title>{insightTypeInfo?.label}</s.Title>
        {metric && <Tag content={metric} type={"highlight"} />}
        {insight.status && statusInfo && (
          <Tooltip
            title={<KeyValue label="Status">{statusInfo.label}</KeyValue>}
            placement={"top"}
            fullWidth={true}
          >
            <s.StyledInsightStatusBadge
              status={insight.status}
              withLabel={false}
            />
          </Tooltip>
        )}
        <NewPopover
          isOpen={isKebabMenuOpen}
          onOpenChange={setIsKebabMenuOpen}
          placement={"bottom-end"}
          content={
            <s.StyledPopup>
              <MenuList items={menuItems} />
            </s.StyledPopup>
          }
        >
          <NewIconButton
            icon={ThreeDotsIcon}
            buttonType={"secondaryBorderless"}
            size={"small"}
          />
        </NewPopover>
      </s.TitleRow>
      {spanInfo && (
        <s.SpanInfoRow>
          <Tooltip title={spanInfo.displayName}>
            <Link onClick={handleSpanLinkClick}>{spanInfo.displayName}</Link>
          </Tooltip>
          <s.StyledCopyButton text={spanInfo.displayName} />
        </s.SpanInfoRow>
      )}
    </s.Container>
  );
};
