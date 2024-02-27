import { useState } from "react";
import { useTheme } from "styled-components";
import { openURLInDefaultBrowser } from "../../../../utils/openURLInDefaultBrowser";
import { IconButton } from "../../../Insights/common/InsightCard/IconButton";
import { Menu } from "../../../common/Menu";
import { NewPopover } from "../../../common/NewPopover";
import { PencilIcon } from "../../../common/icons/12px/PencilIcon";
import { JiraLogoIcon } from "../../../common/icons/16px/JiraLogoIcon";
import { OpenLinkIcon } from "../../../common/icons/OpenLinkIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { JiraButtonProps } from "./types";

export const JiraButton = (props: JiraButtonProps) => {
  const [isJiraPopoverOpen, setIsJiraPopoverOpen] = useState(false);
  const theme = useTheme();
  const { ticketLink } = props;

  const handleJiraButtonClick = () => {
    setIsJiraPopoverOpen(!isJiraPopoverOpen);
  };

  const handleViewButtonClick = () => {
    ticketLink && openURLInDefaultBrowser(ticketLink);
  };

  const openTicketInfo = (event: string) => {
    props.onTicketInfoButtonClick(props.spanCodeObjectId, event);
  };

  const renderButton = () => (
    <div>
      {ticketLink ? (
        <NewPopover
          content={
            <Menu
              width={"70px"}
              items={[
                {
                  icon: { component: OpenLinkIcon },
                  label: "View",
                  value: ticketLink,
                  onClick: handleViewButtonClick
                },
                {
                  icon: { component: PencilIcon },
                  label: "Edit",
                  value: props.spanCodeObjectId ?? "",
                  onClick: () => openTicketInfo("edit menu item click")
                }
              ]}
              onSelect={handleJiraButtonClick}
            />
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
      style={{
        background: theme.colors.surface.secondary,
        boxShadow: "0 1px 12px 0 rgb(0 0 0 / 26%)"
      }}
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
      isOpen={props.isHintEnabled}
    >
      {renderButton()}
    </Tooltip>
  );
};
