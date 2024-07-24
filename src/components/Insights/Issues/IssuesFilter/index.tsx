import { useCallback, useEffect, useMemo, useState } from "react";
import { useInsightsStore } from "../../../../containers/Main/stores/useInsightsStore";
import { usePersistence } from "../../../../hooks/usePersistence";
import { usePrevious } from "../../../../hooks/usePrevious";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { FilterButton } from "../../../common/FilterButton";
import { NewPopover } from "../../../common/NewPopover";
import { EyeIcon } from "../../../common/icons/12px/EyeIcon";
import { FourPointedStarIcon } from "../../../common/icons/12px/FourPointedStarIcon";
import { WarningTriangleIcon } from "../../../common/icons/WarningTriangleIcon";
import { IconProps } from "../../../common/icons/types";
import { Select } from "../../../common/v3/Select";
import { SelectItem } from "../../../common/v3/Select/types";
import { InsightFilterType } from "../../InsightsCatalog/types";
import { useIssuesFilters } from "../useIssuesFilters";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { IssuesFilterQuery } from "./types";

const PERSISTENCE_KEY = "issuesFilters";

export const IssuesFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const filteredInsightTypes = useInsightsStore.use.filteredInsightTypes();
  const setFilteredInsightTypes =
    useInsightsStore.use.setFilteredInsightTypes();
  const filters = useInsightsStore.use.filters();
  const setFilters = useInsightsStore.use.setFilters();
  const isCriticalOnly = useMemo(
    () => filters.includes("criticality"),
    [filters]
  );
  const isUnreadOnly = useMemo(() => filters.includes("unread"), [filters]);
  const [persistedFilters, setPersistedFilters] =
    usePersistence<IssuesFilterQuery>(PERSISTENCE_KEY, "project");
  const previousPersistedFilters = usePrevious(persistedFilters);
  const { data } = useIssuesFilters();
  const previousData = usePrevious(data);

  const applyFilters = useCallback(
    (
      value: string | string[],
      isCriticalOnly: boolean,
      isUnreadOnly: boolean
    ) => {
      const newInsightTypes = Array.isArray(value) ? value : [value];
      const newFilters: InsightFilterType[] = [
        ...(isCriticalOnly ? (["criticality"] as InsightFilterType[]) : []),
        ...(isUnreadOnly ? (["unread"] as InsightFilterType[]) : [])
      ];
      setFilteredInsightTypes(newInsightTypes);
      setFilters(newFilters);

      const newFilterValue: IssuesFilterQuery = {
        issueTypes: newInsightTypes,
        filters: newFilters
      };
      setPersistedFilters(newFilterValue);
    },
    [setFilters, setPersistedFilters, setFilteredInsightTypes]
  );

  useEffect(() => {
    if (
      previousData &&
      previousData !== data &&
      filteredInsightTypes.length > 0
    ) {
      const newSelection = filteredInsightTypes.filter((e) =>
        Boolean(data?.issueTypeFilters.find((x) => x.name === e && x.enabled))
      );

      if (newSelection.length !== filteredInsightTypes.length) {
        applyFilters(newSelection, isCriticalOnly, isUnreadOnly);
      }
    }
  }, [
    previousData,
    data,
    filteredInsightTypes,
    applyFilters,
    isCriticalOnly,
    isUnreadOnly
  ]);

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CLEAR_ALL_FILTERS_BUTTON_CLICKED
    );
    applyFilters([], false, false);
  };

  const handleIssueTypesChange = useCallback(
    (value: string | string[]) => {
      sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED);
      applyFilters(value, isCriticalOnly, isUnreadOnly);
    },
    [applyFilters, isCriticalOnly, isUnreadOnly]
  );

  const handleCriticalityChange = useCallback(
    (value: string | string[]) => {
      sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED);
      applyFilters(filteredInsightTypes, value === "criticality", isUnreadOnly);
    },
    [applyFilters, filteredInsightTypes, isUnreadOnly]
  );

  const handleReadStatusChange = useCallback(
    (value: string | string[]) => {
      sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED);
      applyFilters(filteredInsightTypes, isCriticalOnly, value === "unread");
    },
    [applyFilters, filteredInsightTypes, isCriticalOnly]
  );

  useEffect(() => {
    if (
      !previousPersistedFilters &&
      previousPersistedFilters !== persistedFilters
    ) {
      applyFilters(
        persistedFilters?.issueTypes ?? [],
        Boolean(persistedFilters?.filters.includes("criticality")),
        Boolean(persistedFilters?.filters.includes("unread"))
      );
    }
  }, [previousPersistedFilters, persistedFilters, applyFilters]);

  const issueTypesFilterOptions: SelectItem[] =
    data?.issueTypeFilters?.map((entry) => ({
      value: entry.name,
      label: getInsightTypeInfo(entry.name)?.label ?? entry.name,
      enabled: entry.enabled || filteredInsightTypes.includes(entry.name),
      selected: filteredInsightTypes.includes(entry.name) && entry.enabled
    })) ?? [];

  const criticalityFilterOptions: SelectItem[] = [
    {
      label: "Critical",
      value: "criticality",
      enabled: true,
      selected: isCriticalOnly
    },
    {
      label: "All",
      value: "all",
      enabled: true,
      selected: !isCriticalOnly
    }
  ];

  const readStatusFilterOptions: SelectItem[] = [
    {
      label: "Unread",
      value: "unread",
      enabled: true,
      selected: isUnreadOnly
    },
    {
      label: "All",
      value: "all",
      enabled: true,
      selected: !isUnreadOnly
    }
  ];

  const criticalityFilterPlaceholder =
    criticalityFilterOptions.find((x) => x.selected)?.label ?? "All";
  const readStatusFilterPlaceholder =
    readStatusFilterOptions.find((x) => x.selected)?.label ?? "All";
  const selectedFiltersCount =
    (filteredInsightTypes.length > 0 ? 1 : 0) +
    (isCriticalOnly ? 1 : 0) +
    (isUnreadOnly ? 1 : 0);

  return (
    <NewPopover
      width={"100%"}
      content={
        <s.Container>
          <s.Header>Filters</s.Header>
          <s.FilterCategoryName>Issues</s.FilterCategoryName>
          <Select
            key={"issues"}
            items={issueTypesFilterOptions}
            onChange={handleIssueTypesChange}
            placeholder={filteredInsightTypes.length > 0 ? "Issues" : "All"}
            multiselect={true}
            icon={(props: IconProps) => (
              <s.InsightIconContainer>
                <FourPointedStarIcon {...props} />
              </s.InsightIconContainer>
            )}
            disabled={issueTypesFilterOptions?.length === 0}
          />
          <s.FilterCategoryName>Criticality</s.FilterCategoryName>
          <Select
            key={"criticality"}
            items={criticalityFilterOptions}
            onChange={handleCriticalityChange}
            placeholder={criticalityFilterPlaceholder}
            icon={(props: IconProps) => (
              <s.InsightIconContainer>
                <WarningTriangleIcon {...props} />
              </s.InsightIconContainer>
            )}
            showSelectedState={isCriticalOnly}
          />
          <s.FilterCategoryName>Read/Unread</s.FilterCategoryName>
          <Select
            key={"readStatus"}
            items={readStatusFilterOptions}
            onChange={handleReadStatusChange}
            placeholder={readStatusFilterPlaceholder}
            icon={(props: IconProps) => (
              <s.InsightIconContainer>
                <EyeIcon {...props} />
              </s.InsightIconContainer>
            )}
            showSelectedState={isUnreadOnly}
          />
          <s.Footer>
            <s.ClearAllButton
              buttonType={"tertiary"}
              label={"Clear filters"}
              isDisabled={filteredInsightTypes.length === 0}
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
          selectedCount={selectedFiltersCount}
          isActive={isOpen}
        />
      </div>
    </NewPopover>
  );
};
