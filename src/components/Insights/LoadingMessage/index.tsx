import { PetalsIcon } from "../../common/icons/16px/PetalsIcon";
import * as s from "./styles";

export const LoadingMessage = () => (
  <s.Container>
    <s.IconContainer>
      <PetalsIcon color={"currentColor"} size={32} />
    </s.IconContainer>
    <s.TextContainer>
      <s.Title>Fetching results</s.Title>
      <span>Updating the results list may take a few moments.</span>
    </s.TextContainer>
  </s.Container>
);
