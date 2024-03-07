import { ForwardedRef, forwardRef, useState } from "react";
import { useTheme } from "styled-components";
import { openURLInDefaultBrowser } from "../../../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../../utils/sendTrackingEvent";
import { trackingEvents } from "../../../Insights/tracking";
import { MenuList } from "../../../Navigation/common/MenuList";
import { Popup } from "../../../Navigation/common/Popup";
import { PencilIcon } from "../../../common/icons/12px/PencilIcon";
import { JiraLogoIcon } from "../../../common/icons/16px/JiraLogoIcon";
import { OpenLinkIcon } from "../../../common/icons/OpenLinkIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import { NewPopover } from "../../NewPopover";
import { Button } from "../Button";
import * as s from "./styles";
import { JiraButtonProps } from "./types";

export const JiraButtonComponent = (
  {
    ticketLink,
    isHintEnabled,
    onTicketInfoOpen,
    spanCodeObjectId,
    buttonType,
    label,
    insightType
  }: JiraButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();

  const handleMenuOpenChange = (isOpen: boolean) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType
    });
    setIsMenuOpen(isOpen);
  };

  const handleViewMenuItemClick = () => {
    setIsMenuOpen(false);
    ticketLink && openURLInDefaultBrowser(ticketLink);
  };

  const handleEditMenuItemClick = () => {
    setIsMenuOpen(false);
    openTicketInfo("edit menu item click");
  };

  const openTicketInfo = (event: string) => {
    onTicketInfoOpen(spanCodeObjectId, event);
  };

  const handleJiraButtonClick = () => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType
    });
    openTicketInfo("jira button click");
  };

  const handleTryButtonClick = () => {
    openTicketInfo("try now button click");
  };

  const renderButton = () => (
    <div>
      {ticketLink ? (
        <NewPopover
          content={
            <Popup>
              <MenuList
                items={[
                  {
                    icon: <OpenLinkIcon />,
                    label: "View",
                    id: "view",
                    onClick: handleViewMenuItemClick
                  },
                  {
                    icon: <PencilIcon />,
                    label: "Edit",
                    id: "edit",
                    onClick: handleEditMenuItemClick
                  }
                ]}
              />
            </Popup>
          }
          isOpen={isMenuOpen}
          onOpenChange={handleMenuOpenChange}
          placement={"bottom-start"}
        >
          <Button
            buttonType={buttonType}
            label={label}
            icon={() => (
              <JiraLogoIcon
                isActive={true}
                size={16}
                color={theme.colors.v3.icon.brandSecondary}
              />
            )}
          />
        </NewPopover>
      ) : (
        <Button
          buttonType={buttonType}
          label={label}
          icon={JiraLogoIcon}
          onClick={handleJiraButtonClick}
        />
      )}
    </div>
  );

  return (
    <div ref={ref}>
      <Tooltip
        fullWidth={true}
        placement={"top-start"}
        title={
          <s.HintContainer>
            <s.HintHeader>
              <s.HintIconContainer>
                <JiraLogoIcon size={16} color={"currentColor"} />
              </s.HintIconContainer>
              <span>Get Ticket Info</span>
            </s.HintHeader>
            <span>
              You can now easily create a ticket using information from Digma
            </span>
            <s.TryNowButton onClick={handleTryButtonClick} label={"Try now"} />
          </s.HintContainer>
        }
        isOpen={Boolean(isHintEnabled)}
      >
        {renderButton()}
      </Tooltip>
    </div>
  );
};

export const JiraButton = forwardRef(JiraButtonComponent);
