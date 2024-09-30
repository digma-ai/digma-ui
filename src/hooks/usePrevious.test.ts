import { act, renderHook } from "@testing-library/react";
import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
  it("should return undefined on initial render", () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBeUndefined();
  });

  it("should return the previous value after update", () => {
    let value = 0;
    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeUndefined();

    act(() => {
      value = 1;
      rerender();
    });

    expect(result.current).toBe(0);

    act(() => {
      value = 2;
      rerender();
    });

    expect(result.current).toBe(1);
  });
});
