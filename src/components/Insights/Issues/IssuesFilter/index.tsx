import { useContext, useEffect, useState } from "react";
import { usePersistence } from "../../../../hooks/usePersistence";
import { usePrevious } from "../../../../hooks/usePrevious";
import { isEnvironment } from "../../../../typeGuards/isEnvironment";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { FilterButton } from "../../../common/FilterButton";
import { NewPopover } from "../../../common/NewPopover";
import { Select } from "../../../common/Select";
import { SparkleIcon } from "../../../common/icons/SparkleIcon";
import { NewButton } from "../../../common/v3/NewButton";
import { useIssuesFilters } from "../useIssuesFilters";
import * as s from "./styles";
import { IssuesFilterProps, IssuesFilterQuery } from "./types";

const PERSISTENCE_KEY = "issuesFilters";

export const IssuesFilter = ({ query, onApply }: IssuesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssueTypes, setSelectedIssueTypes] = useState<string[]>([]);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);
  const previousScope = usePrevious(config.scope);
  const [persistedFilters, setPersistedFilters] =
    usePersistence<IssuesFilterQuery>(PERSISTENCE_KEY, "project");
  const previousPersistedFilters = usePrevious(persistedFilters);

  const { data, refresh } = useIssuesFilters({
    refreshInterval: 1000,
    query: query
  });

  const handleClearFiltersButtonClick = () => {
    handleSelectionChange([]);
  };

  const handleSelectionChange = (value: string | string[]) => {
    const newValue = Array.isArray(value) ? value : [value];
    setSelectedIssueTypes(newValue);
    const newFilterValue: IssuesFilterQuery = {
      issueTypes: newValue
    };
    setPersistedFilters(newFilterValue);
    onApply(newFilterValue);
  };

  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      previousPersistedFilters !== persistedFilters
    ) {
      handleSelectionChange(persistedFilters?.issueTypes ?? []);
    }
  }, [previousPersistedFilters, persistedFilters]);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== config.environment?.id) ||
      (previousScope && previousScope !== config.scope)
    ) {
      refresh();
    }
  }, [
    previousEnvironment,
    config.environment,
    onApply,
    previousScope,
    config.scope,
    refresh
  ]);

  const issuesTypeFilter =
    data?.issueTypeFilters?.map((entry) => ({
      value: entry.name,
      label: getInsightTypeInfo(entry.name)?.label ?? entry.name,
      enabled: entry.enabled || selectedIssueTypes.includes(entry.name),
      selected: selectedIssueTypes.includes(entry.name)
    })) ?? [];

  return (
    <NewPopover
      width={"calc(100% - 16px)"}
      content={
        <s.Container>
          <s.Header>Filters</s.Header>
          <s.FilterCategoryName>Issues</s.FilterCategoryName>
          {
            <Select
              searchable={true}
              key={"issues"}
              items={issuesTypeFilter}
              onChange={handleSelectionChange}
              placeholder={selectedIssueTypes.length > 0 ? "Issues" : "All"}
              multiselect={true}
              icon={SparkleIcon}
              disabled={issuesTypeFilter?.length === 0}
            />
          }
          <s.Footer>
            <NewButton
              buttonType={"tertiary"}
              label={"Clear filters"}
              isDisabled={selectedIssueTypes.length === 0}
              onClick={handleClearFiltersButtonClick}
            />
          </s.Footer>
        </s.Container>
      }
      onOpenChange={setIsOpen}
      isOpen={isOpen}
      placement={"bottom-end"}
    >
      <div>
        <FilterButton
          title={"Filters"}
          showCount={true}
          selectedCount={selectedIssueTypes.length}
        />
      </div>
    </NewPopover>
  );
};
