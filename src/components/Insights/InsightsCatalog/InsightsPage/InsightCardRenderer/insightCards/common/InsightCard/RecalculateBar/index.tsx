import { CheckmarkCircleArrowIcon } from "../../../../../../../../common/icons/16px/CheckmarkCircleArrowIcon";
import * as s from "./styles";

export const RecalculateBar = () => {
  return (
    <s.Container>
      <s.IconContainer>
        <CheckmarkCircleArrowIcon size={16} color={"currentColor"} />
      </s.IconContainer>
      <s.Title>Rechecking insight</s.Title>
      <s.Info>Trigger new actions for this asset</s.Info>
    </s.Container>
  );
};
