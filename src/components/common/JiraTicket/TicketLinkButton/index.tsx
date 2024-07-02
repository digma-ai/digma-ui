import { useEffect, useState } from "react";
import { isValidHttpUrl } from "../../../../utils/isValidUrl";
import { Button } from "../../Button";
import { ActionableTextField } from "../ActionableTextField";
import { TicketLinkButtonProps } from "./types";

export const TicketLinkButton = ({
  ticketLink,
  unlinkTicket,
  linkTicket
}: TicketLinkButtonProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(
    ticketLink?.errorMessage ?? null
  );
  const [link, setLink] = useState<string | null>(ticketLink?.link ?? null);
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

    if (unlinkTicket) {
      unlinkTicket();
    }
  };

  const onLink = () => {
    if (!link || !linkTicket) {
      return;
    }

    linkTicket(link);
  };

  useEffect(() => {
    if (ticketLink?.link) {
      setLink(ticketLink?.link);
    }

    if (ticketLink?.errorMessage) {
      setErrorMessage(ticketLink?.errorMessage);
    }
  }, [ticketLink]);

  return (
    <ActionableTextField
      key={"ticket-link"}
      value={link}
      placeholder={
        "Paste your ticket URL here to link it with this Digma insight"
      }
      label={"Ticket URL"}
      onChange={onTicketLinkChange}
      disabled={Boolean(ticketLink?.link)}
      errorMessage={errorMessage}
      buttons={
        ticketLink?.link ? (
          <Button key={"unlink-ticket"} onClick={onUnlink}>
            Unlink
          </Button>
        ) : (
          <Button
            key={"link-ticket"}
            onClick={onLink}
            disabled={Boolean(!link || errorMessage)}
          >
            Link
          </Button>
        )
      }
    />
  );
};
