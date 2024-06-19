import { CrossedBellIcon } from "../../common/icons/CrossedBellIcon";
import * as s from "./styles";
import { EmptyStateProps } from "./types";

export const EmptyState = ({ title, content }: EmptyStateProps) => (
  <s.Container>
    <s.IconContainer>
      <CrossedBellIcon size={72} color={"currentColor"} />
    </s.IconContainer>
    <s.Title>{title}</s.Title>
    {content}
  </s.Container>
);
