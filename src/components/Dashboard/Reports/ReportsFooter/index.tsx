import { DigmaLogoIcon } from "../../../common/icons/16px/DigmaLogoIcon";
import * as s from "./styles";

export const ReportsFooter = () => (
  <s.LogoContainer>
    <DigmaLogoIcon />
    <span>© {new Date().getFullYear()} digma.ai</span>
  </s.LogoContainer>
);
