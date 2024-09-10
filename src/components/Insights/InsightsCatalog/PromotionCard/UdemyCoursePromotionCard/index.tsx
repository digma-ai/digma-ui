import { PromotionCard } from "..";
import { PromoText, PromoTextBold } from "../../styles";
import { PromotionTag } from "../PromotionTag";
import { Centered, Description, Right } from "../styles";
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
        <PromoText>
          Get our <PromoTextBold>Udemy course FREE</PromoTextBold>
        </PromoText>
      }
      collapsedBackground={
        <>
          <Centered>
            <img src={"/images/promotion/collapsedContainerBackground.svg"} />
          </Centered>
          <Right>
            <img
              src={"/images/promotion/collapsedContainerEllipseShadow.svg"}
            />
          </Right>
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
        <Description>
          <span>Learn how to get more out of Digma</span>
          <span>issues</span>
        </Description>
      </>
    </PromotionCard>
  );
};
