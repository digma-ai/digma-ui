import { useState } from "react";
import { openURLInDefaultBrowser } from "../../../../utils/openURLInDefaultBrowser";
import { Button } from "../../../common/Button";
import { Menu } from "../../../common/Menu";
import { NewButton } from "../../../common/NewButton";
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

  const menuWidth = props.buttonType == "large" ? "119px" : "70px";
  const buttonText = props.buttonType == "large" ? "Ticket Info" : "";

  return (
    <>
      {!props.ticketLink && (
        <Tooltip title={"Ticket Info"}>
          <Button
            icon={{ component: JiraLogoIcon }}
            onClick={() =>
              props.onTicketInfoButtonClick(props.spanCodeObjectId)
            }
          >
            {buttonText}
          </Button>
        </Tooltip>
      )}
      {props.ticketLink && (
        <NewPopover
          content={
            <Menu
              width={menuWidth}
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
                    props.onTicketInfoButtonClick(props.spanCodeObjectId)
                }
              ]}
              onSelect={handleJiraButtonClick}
            />
          }
          isOpen={isJiraPopoverOpen}
          onOpenChange={handleJiraButtonClick}
          placement={"bottom-start"}
        >
          <div>
            <Tooltip
              placement={"top-start"}
              title={
                <s.HintContainer>
                  <s.HintHeader>
                    <JiraLogoIcon size={16} color={"currentColor"} />
                    <span>Get Ticket Info</span>
                    <span>
                      You can now easily create a ticket using information from
                      Digma
                    </span>
                  </s.HintHeader>
                  <NewButton buttonType={"secondary"} label={"Try now"} />
                </s.HintContainer>
              }
              permanent={props.showHint}
            >
              <s.StyledButton
                icon={{ component: JiraLogoIcon }}
                afterTextIcon={
                  <ChevronIcon
                    color={"currentColor"}
                    size={14}
                    direction={
                      isJiraPopoverOpen ? Direction.UP : Direction.DOWN
                    }
                  />
                }
              >
                {buttonText}
              </s.StyledButton>
            </Tooltip>
          </div>
        </NewPopover>
      )}
    </>
  );
};
