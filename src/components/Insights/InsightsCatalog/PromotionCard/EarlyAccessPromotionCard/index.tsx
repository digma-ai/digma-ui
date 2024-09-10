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
        <s.PromoText>
          Get <s.PromoTextBold>Digma features early access</s.PromoTextBold>
        </s.PromoText>
      }
      collapsedBackground={
        <>
          <s.Right>
            <img
              src={
                "/images/promotion/early-access/collapsedContainerBackground.svg"
              }
            />
          </s.Right>
        </>
      }
      background={
        <img src={"/images/promotion/early-access/promotionLogo.svg"} />
      }
    >
      <s.Description>
        <span>Register to get early</span>
        <span>access to Digma</span>
        <span>capabilities</span>
      </s.Description>
    </s.StyledPromotionCard>
  );
};
