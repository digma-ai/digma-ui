import { isString } from "../../../../typeGuards/isString";
import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import * as s from "./styles";
import type { DialogProps } from "./types";

export const Dialog = ({ title, onClose, children }: DialogProps) => (
  <s.Container>
    <s.Header>
      <s.Header>
        {isString(title) ? title : null}
        <s.CloseButton onClick={onClose}>
          <CrossIcon color={"currentColor"} />
        </s.CloseButton>
      </s.Header>
    </s.Header>
    {children}
  </s.Container>
);
