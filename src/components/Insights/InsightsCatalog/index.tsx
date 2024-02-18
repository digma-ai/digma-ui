import { useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";

import { useDebounce } from "../../../hooks/useDebounce";
import { isNumber } from "../../../typeGuards/isNumber";
import { ConfigContext } from "../../common/App/ConfigContext";
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
  const [searchInputValue, setSearchInputValue] = useState(
    defaultQuery.searchQuery
  );
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);
  const [sorting, setSorting] = useState<Sorting>(defaultQuery.sorting);
  const previousSorting = usePrevious(sorting);
  const previousSearchQuery = usePrevious(debouncedSearchInputValue);
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );
  const config = useContext(ConfigContext);
  const previousConfig = usePrevious(config);

  useEffect(() => {
    if (
      previousConfig &&
      (previousConfig?.scope?.span !== config?.scope?.span ||
        previousConfig?.environment?.originalName !==
          config.environment?.originalName)
    ) {
      setPage(0);
    }
  }, [previousConfig, config]);

  useEffect(() => {
    props.onQueryChange({
      page,
      sorting,
      searchQuery: debouncedSearchInputValue
    });
  }, []);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (previousSorting && previousSorting !== sorting) ||
      previousSearchQuery !== debouncedSearchInputValue
    ) {
      props.onQueryChange({
        page,
        sorting,
        searchQuery: debouncedSearchInputValue
      });
    }
  }, [
    previousSorting,
    sorting,
    previousPage,
    page,
    debouncedSearchInputValue,
    previousSearchQuery
  ]);

  return (
    <>
      <s.Toolbar>
        <SearchInput
          onChange={(val: string | null) => {
            setSearchInputValue(val);
          }}
          value={searchInputValue}
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
        page={page}
        insights={insights}
        isFilteringEnabled={debouncedSearchInputValue !== null}
        onJiraTicketCreate={onJiraTicketCreate}
        onRefresh={props.onRefresh}
      />
      {totalCount > 0 && (
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
      )}
    </>
  );
};
