import { RegistrationCard } from "..";
import * as s from "./styles";
import { EarlyAccessRegistrationCardPros } from "./types";

export const EarlyAccessRegistrationCard = ({
  onClose,
  onComplete,
  className,
  show
}: EarlyAccessRegistrationCardPros) => {
  return (
    <RegistrationCard
      onClose={onClose}
      onComplete={onComplete}
      className={className}
      submitBtnText="Sign Up"
      show={show}
      icon={
        <img src={`/images/promotion/early-access/registrationPromoLogo.svg`} />
      }
      details={
        <s.Description>
          <s.Title>Access to Digma exclusive features</s.Title>
          We have launched an innovator program to give you early access to new
          features, issues detection, UI drilldowns, and more. Sign up before to
          get into the list.
        </s.Description>
      }
    />
  );
};
