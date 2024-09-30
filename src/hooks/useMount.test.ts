import { renderHook } from "@testing-library/react";
import { useMount } from "./useMount";

describe("useMount", () => {
  const effect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the effect function on mount", () => {
    renderHook(() => useMount(effect));
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("should not call the effect function on subsequent renders", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useMount(effect));
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
