import { RegistrationCard } from "..";
import { SuccessRegistrationImage } from "../Images/SuccessRegistrationImage";
import * as s from "./styles";
import type { EarlyAccessRegistrationCardPros } from "./types";

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
      submitBtnText={"Sign Up"}
      show={show}
      scope={"early-access"}
      successLogo={
        <SuccessRegistrationImage
          basePath={"/assets/images/promotion/early-access/"}
        />
      }
      icon={
        <img
          src={`/assets/images/promotion/early-access/registrationPromoLogo.svg`}
        />
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
