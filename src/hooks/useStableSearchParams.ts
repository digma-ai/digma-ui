// Designed to use instead of react-router's useSearchParams,
// as setSearchParams function identity changes on re-renders.
// More info: https://github.com/remix-run/react-router/issues/9991

import { useRef } from "react";
import type {
  NavigateOptions,
  SetURLSearchParams,
  URLSearchParamsInit
} from "react-router";
import { useSearchParams } from "react-router";

export function useStableSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams] {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);
  const paramsRef = useRef(searchParams);
  const stableSetSearchParamsRef = useRef<SetURLSearchParams>();

  paramsRef.current = searchParams;

  if (!stableSetSearchParamsRef.current) {
    stableSetSearchParamsRef.current = (
      nextInit?:
        | URLSearchParamsInit
        | ((prev: URLSearchParams) => URLSearchParamsInit),
      navigateOptions?: NavigateOptions
    ) => {
      const nextParams =
        typeof nextInit === "function" ? nextInit(paramsRef.current) : nextInit;

      setSearchParams(nextParams, navigateOptions);
    };
  }

  return [searchParams, stableSetSearchParamsRef.current];
}
