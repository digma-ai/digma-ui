import { SuccessRegistrationImage } from "../Images/SuccessRegistrationImage";
import * as s from "./styles";

export const SuccessRegistration = () => {
  return (
    <s.Container>
      <SuccessRegistrationImage />
      <s.Details>
        <s.Header>Email sent!</s.Header>
        <s.Description>
          Please check your email for the next instructions
        </s.Description>
      </s.Details>
    </s.Container>
  );
};
