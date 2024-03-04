import { ForwardedRef, forwardRef, useState } from "react";
import { useTheme } from "styled-components";
import { openURLInDefaultBrowser } from "../../../../utils/openURLInDefaultBrowser";
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
    onTicketInfoButtonClick,
    spanCodeObjectId,
    buttonType,
    label
  }: JiraButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [isJiraPopoverOpen, setIsJiraPopoverOpen] = useState(false);
  const theme = useTheme();

  const handleJiraButtonClick = () => {
    setIsJiraPopoverOpen(!isJiraPopoverOpen);
  };

  const handleViewButtonClick = () => {
    handleJiraButtonClick();
    ticketLink && openURLInDefaultBrowser(ticketLink);
  };

  const openTicketInfo = (event: string) => {
    handleJiraButtonClick();
    onTicketInfoButtonClick(spanCodeObjectId, event);
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
                    onClick: handleViewButtonClick
                  },
                  {
                    icon: <PencilIcon />,
                    label: "Edit",
                    id: "edit",
                    onClick: () => openTicketInfo("edit menu item click")
                  }
                ]}
              />
            </Popup>
          }
          isOpen={isJiraPopoverOpen}
          onOpenChange={handleJiraButtonClick}
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
          onClick={() => openTicketInfo("jira button click")}
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
            <s.TryNowButton
              onClick={() => openTicketInfo("try now button click")}
              label={"Try now"}
            />
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
