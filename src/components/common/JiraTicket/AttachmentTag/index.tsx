import { Tooltip } from "../../../common/Tooltip";
import * as s from "./styles";
import { AttachmentTagProps } from "./types";

export const AttachmentTag = ({ icon: Icon, text }: AttachmentTagProps) => (
  <s.Container>
    <s.IconContainer>
      <Icon color={"currentColor"} size={16} />
    </s.IconContainer>
    <Tooltip title={text}>
      <s.TextContainer>{text}</s.TextContainer>
    </Tooltip>
  </s.Container>
);
