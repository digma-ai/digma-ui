import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import * as s from "./styles";
import type { AccountActivationProps } from "./types";

export const AccountActivation = ({
  onClose,
  emailToConfirm,
  onConfirmationEmailResend
}: AccountActivationProps) => {
  const handleResendButtonClick = () => {
    if (!emailToConfirm) {
      return;
    }

    sendUserActionTrackingEvent("resend button clicked");
    onConfirmationEmailResend(emailToConfirm);
  };

  const handleLinkClick = () => {
    sendUserActionTrackingEvent("I activated my account link clicked");
    onClose();
  };

  return (
    <s.Container>
      <s.Illustration src={`/assets/images/mailWithCheckmark.svg`} />
      <s.TextContainer>
        <s.Title>Check your mail</s.Title>
        <span>
          Click the link in the email to confirm your address. If you
          haven&apos;t received the email, click &quot;Resend.&quot;
        </span>
      </s.TextContainer>
      {emailToConfirm && (
        <s.ResendButton
          buttonType={"secondary"}
          label={"Resend"}
          onClick={handleResendButtonClick}
        />
      )}
      <s.IActivatedMyAccountLink onClick={handleLinkClick}>
        I activated my account
      </s.IActivatedMyAccountLink>
    </s.Container>
  );
};
