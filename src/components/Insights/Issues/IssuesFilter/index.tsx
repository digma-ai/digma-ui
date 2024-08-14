import { useEffect, useMemo, useState } from "react";
import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../../../containers/Main/stores/useInsightsStore";
import { getFeatureFlagValue } from "../../../../featureFlags";
import { usePrevious } from "../../../../hooks/usePrevious";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { FilterButton } from "../../../common/FilterButton";
import { NewPopover } from "../../../common/NewPopover";
import { EyeIcon } from "../../../common/icons/12px/EyeIcon";
import { FourPointedStarIcon } from "../../../common/icons/12px/FourPointedStarIcon";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";
import { WarningTriangleIcon } from "../../../common/icons/WarningTriangleIcon";
import { IconProps } from "../../../common/icons/types";
import { Select } from "../../../common/v3/Select";
import { SelectItem } from "../../../common/v3/Select/types";
import { InsightFilterType } from "../../InsightsCatalog/types";
import { useIssuesFilters } from "../useIssuesFilters";
import * as s from "./styles";
import { trackingEvents } from "./tracking";

export const IssuesFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const filteredInsightTypes = useInsightsStore.use.filteredInsightTypes();
  const filteredServices = useInsightsStore.use.filteredServices();
  const setFilteredInsightTypes =
    useInsightsStore.use.setFilteredInsightTypes();
  const setFilteredServices = useInsightsStore.use.setFilteredServices();
  const filters = useInsightsStore.use.filters();
  const backendInfo = useGlobalStore.use.backendInfo();
  const setFilters = useInsightsStore.use.setFilters();
  const isCriticalOnly = useMemo(
    () => filters.includes("criticality"),
    [filters]
  );
  const isUnreadOnly = useMemo(() => filters.includes("unread"), [filters]);
  const { data } = useIssuesFilters();
  const previousData = usePrevious(data);

  useEffect(() => {
    if (previousData && previousData !== data) {
      if (filteredInsightTypes.length > 0) {
        const newSelection = filteredInsightTypes.filter((e) =>
          Boolean(data?.issueTypeFilters.find((x) => x.name === e && x.enabled))
        );

        if (newSelection.length !== filteredInsightTypes.length) {
          setFilteredInsightTypes(newSelection);
        }
      }

      if (filteredServices.length > 0) {
        const newSelection = filteredServices.filter((e) =>
          Boolean(data?.services?.find((x) => x === e))
        );

        if (newSelection.length !== filteredServices.length) {
          setFilteredServices(newSelection);
        }
      }
    }
  }, [
    previousData,
    data,
    filteredInsightTypes,
    setFilteredInsightTypes,
    filters,
    setFilteredServices,
    filteredServices
  ]);

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CLEAR_ALL_FILTERS_BUTTON_CLICKED
    );
    setFilteredInsightTypes([]);
    setFilters([]);
    setFilteredServices([]);
  };

  const handleIssueTypesChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED, {
      filterType: "issueType"
    });
    const newInsightTypes = Array.isArray(value) ? value : [value];
    setFilteredInsightTypes(newInsightTypes);
  };

  const handleServiceChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED, {
      filterType: "service"
    });
    const newFilteredServices = Array.isArray(value) ? value : [value];
    setFilteredServices(newFilteredServices);
  };

  const handleToggleFilterChange = (
    value: string | string[],
    filterType: InsightFilterType
  ) => {
    sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED, {
      filterType
    });
    const selectedFilters = new Set(filters);
    if (value === filterType) {
      selectedFilters.add(filterType);
    } else {
      selectedFilters.delete(filterType);
    }

    setFilters(Array.from(selectedFilters));
  };

  const servicesFilterOptions: SelectItem[] =
    data?.services?.map((entry) => ({
      value: entry,
      label: entry,
      enabled: true,
      selected: filteredServices.includes(entry)
    })) ?? [];

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
    (filteredServices.length > 0 ? 1 : 0) +
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
            onChange={(value) => handleToggleFilterChange(value, "criticality")}
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
            onChange={(value) => handleToggleFilterChange(value, "unread")}
            placeholder={readStatusFilterPlaceholder}
            icon={(props: IconProps) => (
              <s.InsightIconContainer>
                <EyeIcon {...props} />
              </s.InsightIconContainer>
            )}
            showSelectedState={isUnreadOnly}
          />
          {Boolean(
            getFeatureFlagValue(
              backendInfo,
              FeatureFlag.ARE_ISSUES_FILTERS_ENABLED
            )
          ) && (
            <>
              <s.FilterCategoryName>Services</s.FilterCategoryName>
              <Select
                key={"services"}
                items={servicesFilterOptions}
                onChange={handleServiceChange}
                placeholder={filteredServices.length > 0 ? "Services" : "All"}
                multiselect={true}
                icon={(props: IconProps) => (
                  <s.InsightIconContainer>
                    <WrenchIcon {...props} />
                  </s.InsightIconContainer>
                )}
                disabled={issueTypesFilterOptions?.length === 0}
              />
            </>
          )}
          <s.Footer>
            <s.ClearAllButton
              buttonType={"tertiary"}
              label={"Clear filters"}
              isDisabled={selectedFiltersCount === 0}
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
