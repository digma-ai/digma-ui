import type { FormEvent } from "react";
import { RoundedTriangleIcon } from "../../../../common/icons/12px/RoundedTriangleIcon";
import { Direction } from "../../../../common/icons/types";
import * as s from "./styles";
import type { PromptInputProps } from "./types";

export const PromptInput = ({
  value,
  onChange,
  onSubmit
}: PromptInputProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <s.Form onSubmit={handleSubmit}>
      <s.Input
        type={"text"}
        value={value}
        onChange={handleChange}
        placeholder={"Write your prompt"}
      />
      <s.SubmitButton type={"submit"}>
        <RoundedTriangleIcon
          color={"currentColor"}
          direction={Direction.Right}
        />
      </s.SubmitButton>
    </s.Form>
  );
};
