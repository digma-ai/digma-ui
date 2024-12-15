import * as s from "./styles";
import type { SuccessRegistrationProps } from "./types";

export const SuccessRegistration = ({ image }: SuccessRegistrationProps) => {
  return (
    <s.Container>
      {image}
      <s.Details>
        <s.Header>Email sent!</s.Header>
        <s.Description>
          Please check your email for the next instructions
        </s.Description>
      </s.Details>
    </s.Container>
  );
};
