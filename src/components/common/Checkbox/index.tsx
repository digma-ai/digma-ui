import { ChangeEvent } from "react";
import * as s from "./styles";
import { CheckboxProps } from "./types";

export const Checkbox = (props: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };

  return (
    <s.Container>
      <s.Checkbox
        id={props.id}
        disabled={props.disabled}
        type={"checkbox"}
        onChange={handleChange}
        checked={props.value}
      />
      <s.Label htmlFor={props.id}>{props.label}</s.Label>
    </s.Container>
  );
};
