import { PromoText, PromoTextBold } from "../../styles";
import { Right } from "../styles";
import * as s from "./styles";
import { UdemyCoursePromotionCardProps } from "./types";

export const UdemyCoursePromotionCard = ({
  onAccept,
  onDiscard
}: UdemyCoursePromotionCardProps) => {
  return (
    <s.StyledPromotionCard
      onAccept={onAccept}
      onDiscard={onDiscard}
      acceptBtnText="Register now"
      title={
        <PromoText>
          Get <PromoTextBold>Digma features early access</PromoTextBold>
        </PromoText>
      }
      collapsedBackground={
        <Right>
          <img
            src={
              "/images/promotion/early-access/collapsedContainerBackground.svg"
            }
          />
        </Right>
      }
      background={
        <img src={"/images/promotion/early-access/promotionLogo.svg"} />
      }
    >
      <s.StyledDescription>
        <span>Register to get early</span>
        <span>access to Digma</span>
        <span>capabilities</span>
      </s.StyledDescription>
    </s.StyledPromotionCard>
  );
};
