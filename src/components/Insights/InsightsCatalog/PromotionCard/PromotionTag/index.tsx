import { AffectIcon } from "../../../../common/icons/12px/AffectIcon";
import * as s from "./styles";

export const PromotionTag = () => {
  return (
    <s.Container>
      <s.IconContainer>
        <AffectIcon color={"currentColor"} />
      </s.IconContainer>
      <s.Text>FREE UDEMY COURSE</s.Text>
    </s.Container>
  );
};
