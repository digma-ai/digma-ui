import { ChangeEvent } from "react";
import { Tooltip } from "../Tooltip";
import { CheckmarkIcon } from "../icons/CheckmarkIcon";
import * as s from "./styles";
import { CheckboxProps } from "./types";

export const Checkbox = (props: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };

  return (
    <Tooltip title={props.label} placement={"top-start"}>
      <s.Label $disabled={props.value}>
        <s.CheckboxContainer>
          <s.Checkbox
            disabled={props.disabled}
            type={"checkbox"}
            onChange={handleChange}
            checked={props.value}
          />
          {props.value && (
            <s.CheckContainer>
              <CheckmarkIcon color={"currentColor"} />
            </s.CheckContainer>
          )}
        </s.CheckboxContainer>
        <s.LabelText>{props.label}</s.LabelText>
      </s.Label>
    </Tooltip>
  );
};
