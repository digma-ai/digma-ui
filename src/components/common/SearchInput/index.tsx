import { ChangeEvent } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import * as s from "./styles";
import { SearchInputProps } from "./types";

export const SearchInput = (props: SearchInputProps) => {
  return (
    <s.SearchInputContainer>
      <s.SearchInputIconContainer>
        <MagnifierIcon color={"currentColor"} size={14} />
      </s.SearchInputIconContainer>
      <s.SearchInput
        placeholder={"Search"}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          props.onChange(e.target.value)
        }
        value={props.value || ""}
      />
      <s.DeleteTagButton
        onClick={() => {
          props.onChange("");
        }}
      >
        <CrossIcon color={"currentColor"} size={14} />
      </s.DeleteTagButton>
    </s.SearchInputContainer>
  );
};
