import { ChangeEvent } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import * as s from "./styles";
import { SearchInputProps } from "./types";

export const SearchInput = (props: SearchInputProps) => {
  const handleDeleteButtonClick = () => {
    props.onChange("");
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <s.SearchInputContainer>
      <s.SearchInputIconContainer>
        <MagnifierIcon color={"currentColor"} size={14} />
      </s.SearchInputIconContainer>
      <s.SearchInput
        disabled={props.disabled}
        placeholder={"Search"}
        onChange={handleSearchInputChange}
        value={props.value || ""}
      />
      <s.DeleteTagButton
        disabled={props.disabled}
        onClick={handleDeleteButtonClick}
      >
        <CrossIcon color={"currentColor"} size={14} />
      </s.DeleteTagButton>
    </s.SearchInputContainer>
  );
};
