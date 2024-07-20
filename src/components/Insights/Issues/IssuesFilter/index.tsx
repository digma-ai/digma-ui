import { useCallback, useEffect, useState } from "react";
import { useGlobalStore } from "../../../../containers/Main/stores/globalStore";
import { usePersistence } from "../../../../hooks/usePersistence";
import { usePrevious } from "../../../../hooks/usePrevious";
import { isEnvironment } from "../../../../typeGuards/isEnvironment";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { FilterButton } from "../../../common/FilterButton";
import { NewPopover } from "../../../common/NewPopover";
import { InsightsIcon } from "../../../common/icons/12px/InsightsIcon";
import { IconProps } from "../../../common/icons/types";
import { Select } from "../../../common/v3/Select";
import { useIssuesFilters } from "../useIssuesFilters";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { IssuesFilterProps, IssuesFilterQuery } from "./types";

const PERSISTENCE_KEY = "issuesFilters";

export const IssuesFilter = ({ query, onApply }: IssuesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssueTypes, setSelectedIssueTypes] = useState<string[]>([]);
  const environment = useGlobalStore.use.environment();
  const scope = useGlobalStore.use.scope();
  const previousEnvironment = usePrevious(environment);
  const previousScope = usePrevious(scope);
  const [persistedFilters, setPersistedFilters] =
    usePersistence<IssuesFilterQuery>(PERSISTENCE_KEY, "project");
  const previousPersistedFilters = usePrevious(persistedFilters);
  const { data, refresh } = useIssuesFilters({
    refreshInterval: 10 * 1000,
    query
  });
  const previousData = usePrevious(data);

  const changeSelection = useCallback(
    (value: string | string[]) => {
      const newValue = Array.isArray(value) ? value : [value];
      setSelectedIssueTypes(newValue);
      const newFilterValue: IssuesFilterQuery = {
        issueTypes: newValue
      };
      setPersistedFilters(newFilterValue);
      onApply(newFilterValue);
    },
    [onApply, setPersistedFilters]
  );

  useEffect(() => {
    if (
      previousData &&
      previousData !== data &&
      selectedIssueTypes.length > 0
    ) {
      const newSelection = selectedIssueTypes.filter((e) =>
        Boolean(data.issueTypeFilters.find((x) => x.name === e && x.enabled))
      );

      if (newSelection.length !== selectedIssueTypes.length) {
        changeSelection(newSelection);
      }
    }
  }, [previousData, data, selectedIssueTypes, changeSelection]);

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CLEAR_ALL_FILTERS_BUTTON_CLICKED
    );
    changeSelection([]);
  };

  const handleSelectionChange = useCallback(
    (value: string | string[]) => {
      sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED);
      changeSelection(value);
    },
    [changeSelection]
  );

  useEffect(() => {
    if (
      !previousPersistedFilters &&
      previousPersistedFilters !== persistedFilters
    ) {
      handleSelectionChange(persistedFilters?.issueTypes ?? []);
    }
  }, [previousPersistedFilters, persistedFilters, handleSelectionChange]);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== environment?.id) ||
      (previousScope && previousScope !== scope)
    ) {
      refresh();
    }
  }, [
    previousEnvironment,
    environment,
    onApply,
    previousScope,
    scope,
    refresh
  ]);

  const issuesTypeFilter =
    data?.issueTypeFilters?.map((entry) => ({
      value: entry.name,
      label: getInsightTypeInfo(entry.name)?.label ?? entry.name,
      enabled: entry.enabled || selectedIssueTypes.includes(entry.name),
      selected: selectedIssueTypes.includes(entry.name) && entry.enabled
    })) ?? [];

  return (
    <NewPopover
      width={"100%"}
      content={
        <s.Container>
          <s.Header>Filters</s.Header>
          <s.FilterCategoryName>Issues</s.FilterCategoryName>
          <Select
            key={"issues"}
            items={issuesTypeFilter}
            onChange={handleSelectionChange}
            placeholder={selectedIssueTypes.length > 0 ? "Issues" : "All"}
            multiselect={true}
            icon={(props: IconProps) => (
              <s.InsightIconContainer>
                <InsightsIcon {...props} size={12} color="currentColor" />
              </s.InsightIconContainer>
            )}
            disabled={issuesTypeFilter?.length === 0}
          />
          <s.Footer>
            <s.ClearAllButton
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
          isActive={isOpen}
        />
      </div>
    </NewPopover>
  );
};
