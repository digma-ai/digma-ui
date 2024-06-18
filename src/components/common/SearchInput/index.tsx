import { ChangeEvent } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import * as s from "./styles";
import { SearchInputProps } from "./types";

export const SearchInput = ({
  onChange,
  value,
  disabled
}: SearchInputProps) => {
  const handleDeleteButtonClick = () => {
    onChange("");
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <s.SearchInputContainer>
      <s.SearchInputIconContainer>
        <MagnifierIcon color={"currentColor"} size={14} />
      </s.SearchInputIconContainer>
      <s.SearchInput
        disabled={disabled}
        placeholder={"Search"}
        onChange={handleSearchInputChange}
        value={value ?? ""}
      />
      <s.DeleteTagButton disabled={disabled} onClick={handleDeleteButtonClick}>
        <CrossIcon color={"currentColor"} size={14} />
      </s.DeleteTagButton>
    </s.SearchInputContainer>
  );
};
