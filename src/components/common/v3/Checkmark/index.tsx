import type { ChangeEvent } from "react";
import { CheckmarkIcon } from "../../icons/CheckmarkIcon";
import * as s from "./styles";
import type { CheckmarkProps } from "./types";

export const Checkmark = ({
  onChange,
  value,
  disabled,
  size = "small"
}: CheckmarkProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <s.Container>
      <s.Checkmark
        disabled={disabled}
        type={"checkbox"}
        onChange={handleChange}
        checked={value}
        $size={size}
      />
      {value && (
        <s.CheckmarkContainer>
          <CheckmarkIcon color={"currentColor"} width={10} height={10} />
        </s.CheckmarkContainer>
      )}
    </s.Container>
  );
};
