import { Spinner } from "../../../../common/v3/Spinner";
import * as s from "./styles";
import type { FooterProps } from "./types";

export const Footer = ({
  isLoading,
  loadingMessage,
  errorMessage,
  buttons
}: FooterProps) => (
  <s.Container>
    {isLoading && (
      <s.LoadingMessage>
        <Spinner />
        {loadingMessage}
      </s.LoadingMessage>
    )}
    {errorMessage && <s.ErrorMessage>{errorMessage}</s.ErrorMessage>}
    <s.ButtonsContainer>{buttons}</s.ButtonsContainer>
  </s.Container>
);
