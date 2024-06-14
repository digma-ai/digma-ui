import { forwardRef, useState } from "react";
import { RegisterFrom } from "../../common/RegisterForm";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { RegistrationPromoIcon } from "./Icons/RegistrationPromoIcon";
import { SuccessRegistration } from "./SuccessRegistration";
import * as s from "./styles";
import { RegistrationProps } from "./types";

const RegistrationCardComponent = ({ onClose }: RegistrationProps) => {
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  return (
    <s.Container>
      <s.CrossButton
        buttonType={"tertiary"}
        icon={() => <CrossIcon className="currentColor" size={20} />}
        onClick={onClose}
      />
      {!isFormCompleted ? (
        <>
          <RegistrationPromoIcon />
          <s.FormContainer>
            <s.Description>
              Enter your email address below, and we will send you instructions
              to access the exclusive Digma course on Udemy
            </s.Description>
            <RegisterFrom
              scope="test"
              onNext={() => setIsFormCompleted(true)}
            />
          </s.FormContainer>
        </>
      ) : (
        <SuccessRegistration />
      )}

      <s.SlackLink onClick={() => ({})}>
        <SlackLogoIcon size={14} />
        Join our Digma channel
      </s.SlackLink>
    </s.Container>
  );
};

export const RegistrationCard = forwardRef(RegistrationCardComponent);
