import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../../../../utils/getInsightTypeInfo";
import { ThreeDotsIcon } from "../../../../../../common/icons/ThreeDotsIcon";
import { NewPopover } from "../../../../../../common/NewPopover";
import { Link } from "../../../../../../common/v3/Link";
import { NewIconButton } from "../../../../../../common/v3/NewIconButton";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import { MenuList } from "../../../../../../Navigation/common/MenuList";
import { MenuItem } from "../../../../../../Navigation/common/MenuList/types";
import { trackingEvents } from "../../../../../tracking";
import { isEndpointInsight, isSpanInsight } from "../../../../../typeGuards";
import { InsightIcon } from "../InsightCard/InsightHeader/InsightIcon";
import * as s from "./styles";
import { IssueSimplifiedCardProps } from "./types";

export const IssueSimplifiedCard = ({
  insight,
  metric,
  onGoToSpan,
  onGoToTrace,
  onDismiss,
  onShow,
  onRecheck,
  onRead,
  isCritical
}: IssueSimplifiedCardProps) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const insightTypeInfo = getInsightTypeInfo(insight.type);
  const spanInfo =
    isSpanInsight(insight) || isEndpointInsight(insight)
      ? insight.spanInfo
      : undefined;

  const handleContainerClick = () => {
    // sendUserActionTrackingEvent(trackingEvents.ISSUE_CARD_CLICKED, {
    //   insightType: insight.type
    // });

    if (insight.isReadable && onRead && !insight.isRead) {
      onRead();
    }
  };

  const handleSpanLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUE_CARD_TITLE_ASSET_LINK_CLICKED
    );
    if (spanInfo) {
      onGoToSpan();
    }
  };

  const handleMenuItemClick = (item: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUE_CARD_KEBAB_MENU_ITEM_CLICKED,
      { item }
    );
    switch (item) {
      case "details":
        onGoToSpan && onGoToSpan();
        break;
      case "trace":
        onGoToTrace && onGoToTrace();
        break;
      case "dismiss":
        onDismiss && onDismiss();
        break;
      case "show":
        onShow && onShow();
        break;
      case "ticket":
        break;
      case "recheck":
        onRecheck();
        break;
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: "details",
      label: "Details",
      onClick: () => handleMenuItemClick("details")
    },
    {
      id: "trace",
      label: "Trace",
      onClick: () => handleMenuItemClick("trace")
    },
    ...(insight.isDismissed
      ? [
          {
            id: "show",
            label: "show",
            onClick: () => handleMenuItemClick("show")
          }
        ]
      : [
          {
            id: "dismiss",
            label: "Dismiss",
            onClick: () => handleMenuItemClick("dismiss")
          }
        ]),
    {
      id: "ticket",
      label: "Ticket",
      onClick: () => handleMenuItemClick("ticket")
    },
    {
      id: "recheck",
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
        {metric && <s.MetricTag content={metric} type={"highlight"} />}
        <NewPopover
          isOpen={isKebabMenuOpen}
          onOpenChange={setIsKebabMenuOpen}
          content={<MenuList items={menuItems} />}
        >
          <NewIconButton icon={ThreeDotsIcon} buttonType={"tertiary"} />
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
