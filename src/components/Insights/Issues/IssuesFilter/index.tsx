import { useEffect, useMemo } from "react";
import { useGlobalStore } from "../../../../containers/Main/stores/global/useGlobalStore";
import { useInsightsStore } from "../../../../containers/Main/stores/insights/useInsightsStore";
import { useStore } from "../../../../containers/Main/stores/useStore";
import { getFeatureFlagValue } from "../../../../featureFlags";
import { usePrevious } from "../../../../hooks/usePrevious";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { FilterPopup } from "../../../common/FilterPopup";
import { EyeIcon } from "../../../common/icons/12px/EyeIcon";
import { FourPointedStarIcon } from "../../../common/icons/12px/FourPointedStarIcon";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";
import { WarningTriangleIcon } from "../../../common/icons/WarningTriangleIcon";
import { IconProps } from "../../../common/icons/types";
import { SelectItem } from "../../../common/v3/Select/types";
import { InsightFilterType } from "../../InsightsCatalog/types";
import { useIssuesFilters } from "../useIssuesFilters";
import * as s from "./styles";
import { trackingEvents } from "./tracking";

export const IssuesFilter = () => {
  const { filteredInsightTypes, filters } = useInsightsStore();
  const selectedServices = useGlobalStore().selectedServices;
  const { setSelectedServices, setFilteredInsightTypes, setFilters } =
    useStore.getState();
  const backendInfo = useGlobalStore().backendInfo;
  const isCriticalOnly = useMemo(
    () => filters.includes("criticality"),
    [filters]
  );
  const isUnreadOnly = useMemo(() => filters.includes("unread"), [filters]);
  const { data } = useIssuesFilters();
  const previousData = usePrevious(data);
  const scope = useGlobalStore().scope;
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const isServicesFilterEnabled =
    Boolean(
      getFeatureFlagValue(backendInfo, FeatureFlag.ARE_ISSUES_FILTERS_ENABLED)
    ) && !scopeSpanCodeObjectId;
  const filteredServices = useMemo(
    () => selectedServices ?? [],
    [selectedServices]
  );

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

      if (isServicesFilterEnabled && filteredServices.length > 0) {
        const newSelection = filteredServices.filter((e) =>
          Boolean(data?.services?.find((x) => x === e))
        );

        if (newSelection.length !== filteredServices.length) {
          setSelectedServices(newSelection);
        }
      }
    }
  }, [
    previousData,
    data,
    filteredInsightTypes,
    setFilteredInsightTypes,
    filters,
    setSelectedServices,
    filteredServices,
    isServicesFilterEnabled
  ]);

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CLEAR_ALL_FILTERS_BUTTON_CLICKED
    );
    setFilteredInsightTypes([]);
    setFilters([]);

    if (isServicesFilterEnabled) {
      setSelectedServices([]);
    }
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
    setSelectedServices(newFilteredServices);
  };

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.CLOSE_FILTER_DIALOG_CLICKED);
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
    filteredInsightTypes.length +
    (isServicesFilterEnabled ? filteredServices.length : 0) +
    (isCriticalOnly ? 1 : 0) +
    (isUnreadOnly ? 1 : 0);

  const filterComponents = [
    {
      title: "Issues",
      component: (
        <s.StyledSelect
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
      )
    },
    {
      title: "Criticality",
      component: (
        <s.StyledSelect
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
      )
    },
    {
      title: "Read/Unread",
      component: (
        <s.StyledSelect
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
      )
    }
  ];

  if (isServicesFilterEnabled) {
    filterComponents.unshift({
      title: "Services",
      component: (
        <s.StyledSelect
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
      )
    });
  }

  return (
    <FilterPopup
      onClearAll={handleClearFiltersButtonClick}
      onClose={handleCloseButtonClick}
      title="Filters"
      selectedFiltersCount={selectedFiltersCount}
      filters={filterComponents}
    />
  );
};
