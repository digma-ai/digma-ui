import { LightBulbIcon } from "../../common/icons/LightBulbIcon";
import * as s from "./styles";
import { TipProps } from "./types";

export const Tip = ({ children }: TipProps) => (
  <s.TipContainer>
    <s.TipIconContainer>
      <LightBulbIcon size={16} color={"currentColor"} />
    </s.TipIconContainer>
    {children}
  </s.TipContainer>
);
