import { useEffect, useState } from "react";

export const usePagination = <T>(
  items: T[],
  pageSize: number,
  key?: string
): [T[], number, React.Dispatch<React.SetStateAction<number>>] => {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(items.length / pageSize);
  const pageStart = page * pageSize;
  const pageEnd = pageStart + pageSize;

  const pageItems = items.slice(pageStart, pageEnd);

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
