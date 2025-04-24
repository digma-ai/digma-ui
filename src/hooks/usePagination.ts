import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";

export const usePagination = <T>(
  items: T[],
  pageSize: number,
  key?: string
): [T[], number, Dispatch<SetStateAction<number>>] => {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(items.length / pageSize) || 1;
  const pageStart = page * pageSize;
  const pageEnd = pageStart + pageSize;

  // TODO: remove unnecessary state in usages of usePagination
  const pageItems = useMemo(
    () => items.slice(pageStart, pageEnd),
    [items, pageStart, pageEnd]
  );

  useEffect(() => {
    if (page >= pageCount) {
      setPage(pageCount - 1);
    }
  }, [page, pageCount, items]);

  useEffect(() => {
    if (key) {
      setPage(0);
    }
  }, [key]);

  return [pageItems, page, setPage];
};
