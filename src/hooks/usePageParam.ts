import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const PAGE_SIZE = 10;

export const usePageParam = <T>({
  data,
  pageSize = PAGE_SIZE,
  total
}: {
  data: T | undefined;
  total: number;
  pageSize?: number;
}): { page: number; pageSize?: number; setPage: (page: number) => void } => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const [page, setPage] = useState(() => {
    if (pageParam) {
      const parsedPage = parseInt(pageParam);
      return !isNaN(parsedPage) && parsedPage > 0 ? parsedPage - 1 : 0;
    }

    return 0;
  });

  useEffect(() => {
    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        const newPage = page + 1;
        newParams.set("page", newPage.toString());
        return newParams;
      },
      { replace: true }
    );
  }, [page, setSearchParams]);

  // Ensure page is within valid range
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(total / pageSize) - 1);
    const validPage = Math.min(maxPage, Math.max(0, page));

    if (data && page !== validPage) {
      setPage(validPage);
    }
  }, [data, page, pageSize, total]);

  return { page, setPage };
};
