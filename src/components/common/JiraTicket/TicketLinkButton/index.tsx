import { useEffect, useState } from "react";
import { isValidHttpUrl } from "../../../../utils/isValidUrl";
import { Button } from "../../Button";
import { ActionableTextField } from "../ActionableTextField";
import { TicketLinkButtonProps } from "./types";

export const TicketLinkButton = (props: TicketLinkButtonProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(
    props.ticketLink?.errorMessage || null
  );
  const [link, setLink] = useState<string | null>(
    props.ticketLink?.link || null
  );
  const onTicketLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ticketLink = event.target.value;
    setLink(ticketLink);
    if (!ticketLink || isValidHttpUrl(ticketLink)) {
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid URL.");
    }
  };

  const onUnlink = () => {
    setLink("");
    props.unlinkTicket && props.unlinkTicket();
  };

  const onLink = () => {
    if (!link) {
      return;
    }

    props.linkTicket && props.linkTicket(link);
  };

  useEffect(() => {
    if (props.ticketLink?.link) {
      setLink(props.ticketLink?.link);
    }

    if (props.ticketLink?.errorMessage) {
      setErrorMessage(props.ticketLink?.errorMessage);
    }
  }, [props.ticketLink]);

  return (
    <ActionableTextField
      key="ticket-link"
      value={link}
      placeholder={
        "Paste your ticket URL here to link it with this Digma insight"
      }
      label={"Ticket URL"}
      onChange={onTicketLinkChange}
      disabled={!!props.ticketLink?.link}
      errorMessage={errorMessage}
      buttons={
        props.ticketLink?.link ? (
          <Button key={"unlink-ticket"} onClick={onUnlink}>
            Unlink
          </Button>
        ) : (
          <Button
            key={"link-ticket"}
            onClick={onLink}
            disabled={!link || !!errorMessage}
          >
            Link
          </Button>
        )
      }
    />
  );
};
