import { ForwardedRef, forwardRef } from "react";
import { PetalsIcon } from "../../../common/icons/16px/PetalsIcon";
import * as s from "./styles";
import { SpinnerProps } from "./types";

const SpinnerComponent = (
  { className, size = 16 }: SpinnerProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.Container ref={ref} className={className}>
    <PetalsIcon color={"currentColor"} size={size} />
  </s.Container>
);

export const Spinner = forwardRef(SpinnerComponent);
