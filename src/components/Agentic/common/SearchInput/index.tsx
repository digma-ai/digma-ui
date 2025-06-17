import type { ChangeEvent } from "react";
import { MagnifierIcon } from "../../../common/icons/MagnifierIcon";
import * as s from "./styles";
import type { SearchInputProps } from "./types";

export const SearchInput = ({
  onChange,
  value,
  placeholder = "Search",
  className
}: SearchInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <s.Container className={className}>
      <s.Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <s.IconContainer>
        <MagnifierIcon color={"currentColor"} />
      </s.IconContainer>
    </s.Container>
  );
};
