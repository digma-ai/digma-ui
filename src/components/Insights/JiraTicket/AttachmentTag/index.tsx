import { Tooltip } from "../../../common/Tooltip";
import * as s from "./styles";
import { AttachmentTagProps } from "./types";

export const AttachmentTag = (props: AttachmentTagProps) => (
  <s.Container>
    <s.IconContainer>
      <props.icon color={"currentColor"} />
    </s.IconContainer>
    <Tooltip title={props.text}>
      <s.TextContainer>{props.text}</s.TextContainer>
    </Tooltip>
  </s.Container>
);
