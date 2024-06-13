import { useState } from "react";
import { Link } from "../../../common/Link";
import { CrossIcon } from "../../../common/icons/CrossIcon";
import { PromoLogIcon } from "./PromoLogIcon";
import { PromotionTag } from "./PromotionTag";
import * as s from "./styles";
import { PromotionCardProps } from "./types";

export const PromotionCard = ({ onAccept, onDiscard }: PromotionCardProps) => {
  const [expanded, setExpended] = useState(false);

  const handleCancelClick = () => {
    onDiscard();
  };

  const handleAcceptClick = () => {
    onAccept();
  };

  if (!expanded) {
    return (
      <s.CollapsedContainer>
        <s.PromoText>
          Get our <b>FREE Udemy course</b>
        </s.PromoText>

        <Link onClick={() => setExpended(true)}>See more</Link>
      </s.CollapsedContainer>
    );
  }

  return (
    <s.ExpandedContainer>
      <s.Background />
      <s.LogoBackground>
        <PromoLogIcon />
      </s.LogoBackground>
      <s.ContentContainer>
        <s.DetailsContainer>
          <PromotionTag />
          <s.Description>
            Learn how to get more out of Digma <br /> issues
          </s.Description>
          <s.AcceptButton
            buttonType="primary"
            label="Access course"
            onClick={handleAcceptClick}
          />
        </s.DetailsContainer>
      </s.ContentContainer>
      <s.ActionContainer>
        <s.SkipButton
          buttonType="tertiary"
          label="Don’t show it again"
          onClick={handleCancelClick}
        />
      </s.ActionContainer>
      <s.CrossButton
        buttonType={"tertiary"}
        icon={() => <CrossIcon className="currentColor" size={16} />}
        onClick={() => setExpended(false)}
      />
    </s.ExpandedContainer>
  );
};
