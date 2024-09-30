import { act, renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  it("should initialize correctly", () => {
    const { result } = renderHook(() => usePagination(items, 3));
    const [pageItems, page] = result.current;

    expect(pageItems).toEqual([1, 2, 3]);
    expect(page).toBe(0);
  });

  it("should paginate items correctly", () => {
    const { result } = renderHook(() => usePagination(items, 3));
    const [, , setPage] = result.current;

    act(() => setPage(1));
    const [pageItems] = result.current;
    expect(pageItems).toEqual([4, 5, 6]);

    act(() => setPage(2));
    const [pageItems2] = result.current;
    expect(pageItems2).toEqual([7, 8, 9]);

    act(() => setPage(3));
    const [pageItems3] = result.current;
    expect(pageItems3).toEqual([10]);
  });

  it("should reset page to 0 when key changes", () => {
    const { result, rerender } = renderHook(
      ({ key }) => usePagination(items, 3, key),
      {
        initialProps: { key: "initial" }
      }
    );

    const [, , setPage] = result.current;
    act(() => setPage(2));

    rerender({ key: "newKey" });
    const [pageItems, page] = result.current;
    expect(pageItems).toEqual([1, 2, 3]);
    expect(page).toBe(0);
  });

  it("should handle empty items array", () => {
    const { result } = renderHook(() => usePagination([], 3));
    const [pageItems, page] = result.current;

    expect(pageItems).toEqual([]);
    expect(page).toBe(0);
  });

  it("should handle page size of 0", () => {
    const { result } = renderHook(() => usePagination(items, 0));
    const [pageItems, page] = result.current;

    expect(pageItems).toEqual([]);
    expect(page).toBe(0);
  });

  it("should adjust page if items length changes", () => {
    const { result, rerender } = renderHook(
      ({ items }) => usePagination(items, 3),
      {
        initialProps: { items }
      }
    );

    const [, , setPage] = result.current;
    act(() => setPage(3));

    rerender({ items: items.slice(0, 5) });
    const [pageItems, page] = result.current;
    expect(pageItems).toEqual([4, 5]);
    expect(page).toBe(1);
  });
});
