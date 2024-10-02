import { PromotionCard } from "..";
import { PromoText, PromoTextBold } from "../../../styles";
import { PromotionTag } from "../PromotionTag";
import { Centered, Description, Right } from "../styles";
import * as s from "./styles";
import { UdemyCoursePromotionCardProps } from "./types";

const UdemyPromotionCollapsedBackground = () => (
  <>
    <Centered>
      <img src={"/images/promotion/udemy/collapsedContainerBackground.svg"} />
    </Centered>
    <Right>
      <img
        src={"/images/promotion/udemy/collapsedContainerEllipseShadow.svg"}
      />
    </Right>
  </>
);

const UdemyPromotionBackground = () => (
  <>
    <img src={`/images/promotion/udemy/promotionLogo.svg`} />
    <s.AnimatedPromotionBackground>
      <img src={`/images/promotion/udemy/promotionLogoWithShadow.svg`} />
    </s.AnimatedPromotionBackground>
  </>
);

export const UdemyCoursePromotionCard = ({
  onAccept,
  onDiscard
}: UdemyCoursePromotionCardProps) => {
  return (
    <PromotionCard
      onAccept={onAccept}
      onDiscard={onDiscard}
      scope={"early-access"}
      acceptBtnText={"Access course"}
      title={
        <PromoText>
          Get our <PromoTextBold>Udemy course FREE</PromoTextBold>
        </PromoText>
      }
      collapsedBackground={<UdemyPromotionCollapsedBackground />}
      background={<UdemyPromotionBackground />}
    >
      <PromotionTag />
      <Description>
        <span>Learn how to get more out of Digma</span>
        <span>issues</span>
      </Description>
    </PromotionCard>
  );
};
