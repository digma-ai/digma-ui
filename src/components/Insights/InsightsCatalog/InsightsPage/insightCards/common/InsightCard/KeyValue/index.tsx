import { ForwardedRef, forwardRef } from "react";
import { Info } from "../../../../../../../common/v3/Info";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";
import * as s from "./styles";
import { KeyValueProps } from "./types";

const KeyValueComponent = (
  { className, label, children, info, title = "" }: KeyValueProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.Container className={className} ref={ref}>
    <s.KeyContainer>
      <Tooltip title={label}>
        <s.Key>{label}</s.Key>
      </Tooltip>
      {info && <Info title={info} />}
    </s.KeyContainer>
    <Tooltip title={title} isDisabled={!title}>
      <s.Value>{children}</s.Value>
    </Tooltip>
  </s.Container>
);

export const KeyValue = forwardRef(KeyValueComponent);
