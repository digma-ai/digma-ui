import { useState } from "react";
import { useTheme } from "styled-components";
import { openURLInDefaultBrowser } from "../../../../utils/openURLInDefaultBrowser";
import { Button } from "../../../common/Button";
import { Menu } from "../../../common/Menu";
import { NewPopover } from "../../../common/NewPopover";
import { Tooltip } from "../../../common/Tooltip";
import { PencilIcon } from "../../../common/icons/12px/PencilIcon";
import { JiraLogoIcon } from "../../../common/icons/16px/JiraLogoIcon";
import { ChevronIcon } from "../../../common/icons/ChevronIcon";
import { OpenLinkIcon } from "../../../common/icons/OpenLinkIcon";
import { Direction } from "../../../common/icons/types";
import * as s from "./styles";
import { JiraButtonProps } from "./types";

export const JiraButton = (props: JiraButtonProps) => {
  const [isJiraPopoverOpen, setIsJiraPopoverOpen] = useState(false);
  const theme = useTheme();

  const handleJiraButtonClick = () => {
    setIsJiraPopoverOpen(!isJiraPopoverOpen);
  };

  const handleViewButtonClick = () => {
    props.ticketLink && openURLInDefaultBrowser(props.ticketLink);
  };

  const openTicketInfo = (event: string) => {
    props.onTicketInfoButtonClick(props.spanCodeObjectId, event);
  };

  const menuWidth = props.buttonType == "large" ? "119px" : "70px";
  const buttonText = props.buttonType == "large" ? "Ticket Info" : "";

  const renderButton = () => (
    <div>
      {props.ticketLink ? (
        <NewPopover
          content={
            <Menu
              width={menuWidth}
              items={[
                {
                  icon: { component: OpenLinkIcon },
                  label: "View",
                  value: props.ticketLink,
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
          <s.StyledButton
            icon={{ component: JiraLogoIcon }}
            afterTextIcon={
              <ChevronIcon
                color={"currentColor"}
                size={14}
                direction={isJiraPopoverOpen ? Direction.UP : Direction.DOWN}
              />
            }
          >
            {buttonText}
          </s.StyledButton>
        </NewPopover>
      ) : (
        <Tooltip title={"Ticket Info"}>
          <Button
            icon={{ component: JiraLogoIcon }}
            onClick={() => openTicketInfo("jira button click")}
          >
            {buttonText}
          </Button>
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
            label={"Try now"}
            onClick={() => openTicketInfo("try now button click")}
          />
        </s.HintContainer>
      }
      isOpen={props.isHintEnabled}
    >
      {renderButton()}
    </Tooltip>
  );
};
