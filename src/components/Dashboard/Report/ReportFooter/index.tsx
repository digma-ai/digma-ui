import { DigmaLogoIcon } from "../../../common/icons/16px/DigmaLogoIcon";
import * as s from "./styles";

export const ReportFooter = () => (
  <s.LogoContainer>
    <DigmaLogoIcon />
    <span>&copy; {new Date().getFullYear()} digma.ai</span>
  </s.LogoContainer>
);
