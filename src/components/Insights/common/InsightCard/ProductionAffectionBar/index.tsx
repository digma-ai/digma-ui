import { SparkleIcon } from "../../../../common/icons/16px/SparkleIcon";
import { Link } from "../../../../common/v3/Link";
import * as s from "./styles";
import { ProductionAffectionBarProps } from "./types";

export const ProductionAffectionBar = (props: ProductionAffectionBarProps) => {
  const handleCreateTicketLinkClick = () => {
    props.onCreateTicket();
  };

  return (
    <s.Container $isActive={!props.isTicketCreated}>
      <s.SparkleIconContainer>
        <SparkleIcon size={16} color={"currentColor"} />
      </s.SparkleIconContainer>
      <s.Title>Could affect production</s.Title>
      {props.isTicketCreated ? (
        <s.TicketStatus>Ticket Created</s.TicketStatus>
      ) : (
        <Link onClick={handleCreateTicketLinkClick}>Create Ticket</Link>
      )}
    </s.Container>
  );
};
