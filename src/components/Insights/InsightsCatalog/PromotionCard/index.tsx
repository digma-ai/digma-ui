import { useState } from "react";
import { Link } from "../../../common/Link";
import { CrossIcon } from "../../../common/icons/CrossIcon";
import { PromoLogIcon } from "./PromoLogIcon";
import { PromotionTag } from "./PromotionTag";
import * as s from "./styles";

export const PromotionCard = () => {
  const [expanded, setExpended] = useState(false);

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
      <s.Background></s.Background>
      <s.LogoBackground>
        <PromoLogIcon />
      </s.LogoBackground>
      <s.ContentContainer>
        <s.DetailsContainer>
          <PromotionTag />
          <s.Description>
            Learn how to get more out of Digma <br /> issues
          </s.Description>
          <s.StyledButton buttonType="primary" label="Access course" />
        </s.DetailsContainer>
      </s.ContentContainer>
      <s.ActionContainer>
        <s.SkipButton buttonType="tertiary" label="Don’t show it again" />
      </s.ActionContainer>
      <s.CrossButton
        buttonType={"tertiary"}
        icon={() => <CrossIcon className="currentColor" size={16} />}
        onClick={() => setExpended(false)}
      />
    </s.ExpandedContainer>
  );
};
