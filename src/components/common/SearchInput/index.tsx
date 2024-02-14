import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import * as s from "./styles";
import { SearchInputProps } from "./types";

export const SearchInput = (props: SearchInputProps) => {
  const [searchInputValue, setSearchInputValue] = useState(props.default);
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);

  useEffect(() => {
    props.onChange(debouncedSearchInputValue);
  }, [debouncedSearchInputValue]);

  return (
    <s.SearchInputContainer>
      <s.SearchInputIconContainer>
        <MagnifierIcon color={"currentColor"} size={14} />
      </s.SearchInputIconContainer>
      <s.SearchInput
        placeholder={"Search"}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchInputValue(e.target.value)
        }
      />
    </s.SearchInputContainer>
  );
};
