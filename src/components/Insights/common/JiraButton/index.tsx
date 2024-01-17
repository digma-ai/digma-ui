import { useState } from "react";
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

  const handleJiraButtonClick = () => {
    setIsJiraPopoverOpen(!isJiraPopoverOpen);
  };

  return (
    <>
      {!props.ticketLink && (
        <Tooltip title="Ticket Info">
          <Button
            icon={{ component: JiraLogoIcon }}
            onClick={() =>
              props.handleTicketInfoButtonClick(props.spanCodeObjectId)
            }
          >
            {props.buttonText}
          </Button>
        </Tooltip>
      )}
      {props.ticketLink && (
        <NewPopover
          content={
            <Menu
              width={props.buttonText ? "119px" : "70px"}
              items={[
                {
                  icon: { component: OpenLinkIcon },
                  label: "View",
                  value: props.ticketLink,
                  onClick: () =>
                    props.ticketLink &&
                    openURLInDefaultBrowser(props.ticketLink)
                },
                {
                  icon: { component: PencilIcon },
                  label: "Edit",
                  value: props.spanCodeObjectId ?? "",
                  onClick: () =>
                    props.handleTicketInfoButtonClick(props.spanCodeObjectId)
                }
              ]}
              onSelect={handleJiraButtonClick}
            ></Menu>
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
            {props.buttonText}
          </s.StyledButton>
        </NewPopover>
      )}
    </>
  );
};
