import { PromotionCard } from "..";
import { PromotionTag } from "../PromotionTag";
import * as s from "./styles";
import { UdemyCoursePromotionCardProps } from "./types";

export const UdemyCoursePromotionCard = ({
  onAccept,
  onDiscard
}: UdemyCoursePromotionCardProps) => {
  return (
    <PromotionCard
      onAccept={onAccept}
      onDiscard={onDiscard}
      acceptBtnText="Access course"
      title={
        <s.PromoText>
          Get our <s.PromoTextBold>Udemy course FREE</s.PromoTextBold>
        </s.PromoText>
      }
      collapsedBackground={
        <>
          <s.Centered>
            <img src={"/images/promotion/collapsedContainerBackground.svg"} />
          </s.Centered>
          <s.Right>
            <img
              src={"/images/promotion/collapsedContainerEllipseShadow.svg"}
            />
          </s.Right>
        </>
      }
      background={
        <>
          <img src={`/images/promotion/promotionLogo.svg`} />
          <s.AnimatedPromotionBackground>
            <img src={`/images/promotion/promotionLogoWithShadow.svg`} />
          </s.AnimatedPromotionBackground>
        </>
      }
    >
      <>
        <PromotionTag />
        <s.Description>
          <span>Learn how to get more out of Digma</span>
          <span>issues</span>
        </s.Description>
      </>
    </PromotionCard>
  );
};
