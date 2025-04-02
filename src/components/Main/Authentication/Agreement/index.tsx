import {
  DIGMA_PRIVACY_POLICY_URL,
  DIGMA_TERMS_OF_USE_URL
} from "../../../../constants";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import * as s from "./styles";

export const Agreement = () => {
  const handleTermsOfUseLinkClick = () => {
    sendUserActionTrackingEvent("terms of use link clicked");
    openURLInDefaultBrowser(DIGMA_TERMS_OF_USE_URL);
  };

  const handlePrivacyPolicyLinkClick = () => {
    sendUserActionTrackingEvent("privacy policy link clicked");
    openURLInDefaultBrowser(DIGMA_PRIVACY_POLICY_URL);
  };
  return (
    <s.Container>
      <span>By signing up, you agree with</span>
      <span>
        <s.Link onClick={handleTermsOfUseLinkClick}>Terms of Use</s.Link> and{" "}
        <s.Link onClick={handlePrivacyPolicyLinkClick}>Privacy Policy</s.Link>
      </span>
    </s.Container>
  );
};
