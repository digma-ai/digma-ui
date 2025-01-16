import { SparkleIcon } from "../../../../../../../../common/icons/16px/SparkleIcon";
import { Link } from "../../../../../../../../common/v3/Link";
import * as s from "./styles";
import type { ProductionAffectionBarProps } from "./types";

export const ProductionAffectionBar = ({
  onCreateTicket,
  isTicketCreated
}: ProductionAffectionBarProps) => {
  const handleCreateTicketLinkClick = () => {
    if (onCreateTicket) {
      onCreateTicket();
    }
  };

  return (
    <s.Container $isActive={!isTicketCreated}>
      <s.SparkleIconContainer>
        <SparkleIcon size={16} color={"currentColor"} />
      </s.SparkleIconContainer>
      <s.Title>Could affect production</s.Title>
      {Boolean(onCreateTicket) && (
        <>
          {isTicketCreated ? (
            <s.TicketStatus>Ticket Created</s.TicketStatus>
          ) : (
            <Link onClick={handleCreateTicketLinkClick}>Create Ticket</Link>
          )}
        </>
      )}
    </s.Container>
  );
};
