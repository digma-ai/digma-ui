import type { ChangeEvent } from "react";
import { Tooltip } from "../Tooltip";
import { CheckmarkIcon } from "../icons/CheckmarkIcon";
import * as s from "./styles";
import type { CheckboxProps } from "./types";

export const Checkbox = ({
  onChange,
  label,
  value,
  disabled
}: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <Tooltip title={label} placement={"top-start"}>
      <s.Label $disabled={value}>
        <s.CheckboxContainer>
          <s.Checkbox
            disabled={disabled}
            type={"checkbox"}
            onChange={handleChange}
            checked={value}
          />
          {value && (
            <s.CheckContainer>
              <CheckmarkIcon color={"currentColor"} height={5} />
            </s.CheckContainer>
          )}
        </s.CheckboxContainer>
        <s.LabelText>{label}</s.LabelText>
      </s.Label>
    </Tooltip>
  );
};
