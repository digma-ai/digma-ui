import { useState } from "react";
import { useTheme } from "styled-components";
import { openURLInDefaultBrowser } from "../../../../utils/openURLInDefaultBrowser";
import { IconButton } from "../../../Insights/common/InsightCard/IconButton";
import { MenuList } from "../../../Navigation/common/MenuList";
import { Popup } from "../../../Navigation/common/Popup";
import { PencilIcon } from "../../../common/icons/12px/PencilIcon";
import { JiraLogoIcon } from "../../../common/icons/16px/JiraLogoIcon";
import { OpenLinkIcon } from "../../../common/icons/OpenLinkIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import { NewPopover } from "../../NewPopover";
import * as s from "./styles";
import { JiraButtonProps } from "./types";

export const JiraButton = (props: JiraButtonProps) => {
  const [isJiraPopoverOpen, setIsJiraPopoverOpen] = useState(false);
  const theme = useTheme();
  const { ticketLink, isHintEnabled } = props;

  const handleJiraButtonClick = () => {
    setIsJiraPopoverOpen(!isJiraPopoverOpen);
  };

  const handleViewButtonClick = () => {
    handleJiraButtonClick();
    ticketLink && openURLInDefaultBrowser(ticketLink);
  };

  const openTicketInfo = (event: string) => {
    handleJiraButtonClick();
    props.onTicketInfoButtonClick(props.spanCodeObjectId, event);
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
                    id: ticketLink,
                    onClick: handleViewButtonClick
                  },
                  {
                    icon: <PencilIcon />,
                    label: "Edit",
                    id: props.spanCodeObjectId ?? "",
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
          <IconButton
            icon={{
              component: () => (
                <JiraLogoIcon
                  isActive={true}
                  size={16}
                  color={theme.colors.v3.icon.brandPrimary}
                />
              )
            }}
          />
        </NewPopover>
      ) : (
        <Tooltip title={"Ticket Info"}>
          <IconButton
            icon={{ component: JiraLogoIcon }}
            onClick={() => openTicketInfo("jira button click")}
          />
        </Tooltip>
      )}
    </div>
  );

  return (
    <Tooltip
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
            buttonType={"secondary"}
            onClick={() => openTicketInfo("try now button click")}
          >
            Try now
          </s.TryNowButton>
        </s.HintContainer>
      }
      isOpen={isHintEnabled}
    >
      {renderButton()}
    </Tooltip>
  );
};
