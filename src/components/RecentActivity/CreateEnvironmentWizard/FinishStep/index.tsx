import { CheckmarkCircleIcon } from "../../../common/icons/20px/CheckmarkCircleIcon";
import * as s from "./styles";
import type { FinishStepProps } from "./types";

export const FinishStep = ({ content }: FinishStepProps) => (
  <s.Container>
    <s.CheckMarkIconContainer>
      <CheckmarkCircleIcon size={20} color={"currentColor"} />
    </s.CheckMarkIconContainer>
    {content}
  </s.Container>
);
