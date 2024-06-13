import { SuccessRegistrationIcon } from "../../Icons/SuccessRegistrationIcon";
import * as s from "./styles";

export const SuccessRegistration = () => {
  return (
    <s.Container>
      <SuccessRegistrationIcon />
      <s.Details>
        <s.Header>Email sent!</s.Header>
        <s.Description>
          Please check your email for the next instructions
        </s.Description>
      </s.Details>
    </s.Container>
  );
};
