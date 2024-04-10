import { ForwardedRef, forwardRef } from "react";
import { PetalsIcon } from "../../../common/icons/16px/PetalsIcon";
import * as s from "./styles";
import { SpinnerProps } from "./types";

const SpinnerComponent = (
  props: SpinnerProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.Container ref={ref} className={props.className}>
    <PetalsIcon color={"currentColor"} size={props.size || 16} />
  </s.Container>
);

export const Spinner = forwardRef(SpinnerComponent);
