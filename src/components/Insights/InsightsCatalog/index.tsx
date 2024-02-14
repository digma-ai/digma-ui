import { useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";

import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { Pagination } from "../../common/Pagination";
import { SearchInput } from "../../common/SearchInput";
import { SortingSelector } from "../../common/SortingSelector";
import { SORTING_ORDER, Sorting } from "../../common/SortingSelector/types";
import { InsightsPage } from "../InsightsPage";
import * as s from "./styles";
import { InsightsCatalogProps, SORTING_CRITERION } from "./types";

const PAGE_SIZE = 10;
export const InsightsCatalog = (props: InsightsCatalogProps) => {
  const { insights, onJiraTicketCreate, defaultQuery, totalCount } = props;
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const [searchInputValue, setSearchInputValue] = useState<string | null>(
    defaultQuery.searchQuery
  );
  const [sorting, setSorting] = useState<Sorting>(defaultQuery.sorting);
  const previousSorting = usePrevious(sorting);
  const previousSearchQuery = usePrevious(searchInputValue);
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );

  useEffect(() => {
    props.onQueryChange({
      page,
      sorting,
      searchQuery: searchInputValue
    });
  }, []);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (previousSorting && previousSorting !== sorting) ||
      (isString(previousSearchQuery) &&
        previousSearchQuery !== searchInputValue)
    ) {
      props.onQueryChange({
        page,
        sorting,
        searchQuery: searchInputValue
      });
    }
  }, [
    previousSorting,
    sorting,
    previousPage,
    page,
    searchInputValue,
    previousSearchQuery
  ]);

  return (
    <>
      <s.Toolbar>
        <SearchInput
          onChange={(val: string) => {
            setSearchInputValue(val);
          }}
          default={defaultQuery.searchQuery || ""}
        />
        <SortingSelector
          onChange={(val: Sorting) => {
            setSorting(val);
          }}
          options={[
            {
              value: SORTING_CRITERION.CRITICAL_INSIGHTS,
              label: "Critical insights",
              defaultOrder: SORTING_ORDER.DESC
            },
            {
              value: SORTING_CRITERION.LATEST,
              label: "Latest",
              defaultOrder: SORTING_ORDER.DESC
            }
          ]}
          default={defaultQuery.sorting}
        />
      </s.Toolbar>
      <InsightsPage
        insights={insights}
        onJiraTicketCreate={onJiraTicketCreate}
      />
      <s.Footer>
        <s.FooterItemsCount>
          Showing{" "}
          <s.FooterPageItemsCount>
            {pageStartItemNumber} - {pageEndItemNumber}
          </s.FooterPageItemsCount>{" "}
          of {totalCount}
        </s.FooterItemsCount>
        <Pagination
          itemsCount={totalCount}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          extendedNavigation={true}
        />
      </s.Footer>
    </>
  );
};
