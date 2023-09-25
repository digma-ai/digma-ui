import { CrossedBellIcon } from "../../common/icons/CrossedBellIcon";
import * as s from "./styles";
import { EmptyStateProps } from "./types";

export const EmptyState = (props: EmptyStateProps) => (
  <s.Container>
    <s.IconContainer>
      <CrossedBellIcon size={72} color={"currentColor"} />
    </s.IconContainer>
    <s.Title>{props.title}</s.Title>
    {props.content}
  </s.Container>
);
