import { CheckCircleIcon } from "../../common/icons/38px/CheckCircleIcon";
import { EmptyStateContainer, EmptyStateTextContainer } from "../styles";
import * as s from "./styles";

export const NoDataEmptyState = () => (
  <EmptyStateContainer>
    <s.EmptyStateIconContainer>
      <CheckCircleIcon size={38} color={"currentColor"} />
    </s.EmptyStateIconContainer>
    <EmptyStateTextContainer>
      <s.EmptyStateTitle>
        <span>Good News!</span>
        <span>No Errors Recorded Yet</span>
      </s.EmptyStateTitle>
      You should return to this page if any exceptions do occur to see more
      details.
    </EmptyStateTextContainer>
  </EmptyStateContainer>
);
