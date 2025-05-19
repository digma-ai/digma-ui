import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import type { TagProps } from "./types";

const TagComponent = (
  { className, type, content, title, titlePlacement }: TagProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.Container className={className} $type={type} ref={ref}>
    <Tooltip title={title} isDisabled={!title} placement={titlePlacement}>
      <s.ValueContainer>{content}</s.ValueContainer>
    </Tooltip>
  </s.Container>
);

export const Tag = forwardRef(TagComponent);
