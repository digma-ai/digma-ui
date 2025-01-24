import type { ForwardedRef } from "react";
import { forwardRef, useState } from "react";
import { useTheme } from "styled-components";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../../Insights/tracking";
import { MenuList } from "../../../Navigation/common/MenuList";
import { Popup } from "../../../Navigation/common/Popup";
import { PencilIcon } from "../../../common/icons/12px/PencilIcon";
import { JiraLogoIcon } from "../../../common/icons/16px/JiraLogoIcon";
import { OpenLinkIcon } from "../../../common/icons/OpenLinkIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import { NewPopover } from "../../NewPopover";
import { NewButton } from "../NewButton";
import { NewIconButton } from "../NewIconButton";
import * as s from "./styles";
import type { JiraButtonProps } from "./types";

export const JiraButtonComponent = (
  {
    ticketLink,
    isHintEnabled,
    onTicketInfoOpen,
    spanCodeObjectId,
    type,
    label,
    insightType,
    boundaryRef
  }: JiraButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();

  const handleMenuOpenChange = (isOpen: boolean) => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType
      }
    );
    setIsMenuOpen(isOpen);
  };

  const openTicketInfo = (event: string) => {
    onTicketInfoOpen(spanCodeObjectId, event);
  };

  const handleViewMenuItemClick = () => {
    setIsMenuOpen(false);
    if (ticketLink) {
      openURLInDefaultBrowser(ticketLink);
    }
  };

  const handleEditMenuItemClick = () => {
    setIsMenuOpen(false);
    openTicketInfo("edit menu item click");
  };

  const handleJiraButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType
      }
    );
    openTicketInfo("jira button click");
  };

  const handleTryButtonClick = () => {
    openTicketInfo("try now button click");
  };

  const renderButton = () => {
    const ButtonComponent = type === "icon" ? NewIconButton : NewButton;
    const buttonComponentType =
      type === "icon" ? "secondaryBorderless" : "primary";

    return (
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
            <ButtonComponent
              buttonType={buttonComponentType}
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
          <ButtonComponent
            buttonType={buttonComponentType}
            label={label}
            icon={JiraLogoIcon}
            onClick={handleJiraButtonClick}
          />
        )}
      </div>
    );
  };

  return (
    <div ref={ref}>
      <Tooltip
        boundary={boundaryRef?.current ?? undefined}
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
