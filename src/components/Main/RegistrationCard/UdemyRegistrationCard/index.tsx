import { RegistrationCard } from "..";
import { SuccessRegistrationImage } from "../Images/SuccessRegistrationImage";
import { RegistrationPromoImage } from "./Images/RegistrationPromoImage";
import * as s from "./styles";
import { UdemyRegistrationCardProps } from "./types";

export const UdemyRegistrationCard = ({
  onClose,
  onComplete,
  className,
  show
}: UdemyRegistrationCardProps) => {
  return (
    <RegistrationCard
      onClose={onClose}
      onComplete={onComplete}
      className={className}
      show={show}
      successLogo={
        <SuccessRegistrationImage basePath="/images/promotion/udemy/" />
      }
      scope={"promotion"}
      icon={<RegistrationPromoImage />}
      details={
        <s.Description>
          Enter your email address below, and we will send you instructions to
          access the exclusive Digma course on Udemy
        </s.Description>
      }
    />
  );
};
