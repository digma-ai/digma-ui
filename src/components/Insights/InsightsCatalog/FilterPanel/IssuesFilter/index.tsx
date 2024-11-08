import { useCallback, useEffect, useState } from "react";
import { getFeatureFlagValue } from "../../../../../featureFlags";
import { usePrevious } from "../../../../../hooks/usePrevious";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../../../store/insights/useInsightsSelector";
import { useStore } from "../../../../../store/useStore";
import { FeatureFlag } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { FilterPopup } from "../../../../common/FilterPopup";
import { EyeIcon } from "../../../../common/icons/12px/EyeIcon";
import { FourPointedStarIcon } from "../../../../common/icons/12px/FourPointedStarIcon";
import { WrenchIcon } from "../../../../common/icons/12px/WrenchIcon";
import { WarningTriangleIcon } from "../../../../common/icons/WarningTriangleIcon";
import { IconProps } from "../../../../common/icons/types";
import { SelectItem } from "../../../../common/v3/Select/types";
import { useIssuesFilters } from "../../../Issues/useIssuesFilters";
import { InsightFilterType, ViewMode } from "../../types";
import * as s from "./styles";
import { trackingEvents } from "./tracking";

export const IssuesFilter = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { filteredInsightTypes, filters, viewMode, search } =
    useInsightsSelector();
  const {
    selectedServices: globallySelectedServices,
    backendInfo,
    scope,
    environment
  } = useConfigSelector();
  const {
    setSelectedServices: setGloballySelectedServices,
    setInsightsFilteredInsightTypes: setFilteredInsightTypes,
    setInsightsFilters: setFilters
  } = useStore.getState();
  const [isCriticalOnly, setIsCriticalOnly] = useState<boolean>(
    filters.includes("criticality")
  );
  const [isUnreadOnly, setIsUnreadOnly] = useState<boolean>(
    filters.includes("unread")
  );
  const { data, getData } = useIssuesFilters();
  const previousData = usePrevious(data);
  const environmentId = environment?.id;
  const previousEnvironmentId = usePrevious(environmentId);
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);
  const isServicesFilterEnabled =
    Boolean(
      getFeatureFlagValue(backendInfo, FeatureFlag.ARE_ISSUES_FILTERS_ENABLED)
    ) && !scopeSpanCodeObjectId;
  const [selectedServices, setSelectedServices] = useState<string[]>(
    globallySelectedServices ?? []
  );
  const [selectedInsightTypes, setSelectedInsightTypes] =
    useState<string[]>(filteredInsightTypes);

  // Update selected filters when data is fetched
  useEffect(() => {
    if (previousData && previousData !== data) {
      if (selectedInsightTypes.length > 0) {
        const newSelection = selectedInsightTypes.filter((e) =>
          Boolean(data?.issueTypeFilters.find((x) => x.name === e && x.enabled))
        );

        if (newSelection.length !== selectedInsightTypes.length) {
          setSelectedInsightTypes(newSelection);
        }
      }

      if (isServicesFilterEnabled && selectedServices.length > 0) {
        const newSelection = selectedServices.filter((e) =>
          Boolean(data?.services?.find((x) => x === e))
        );

        if (newSelection.length !== selectedServices.length) {
          setSelectedServices(newSelection);
        }
      }
    }
  }, [
    previousData,
    data,
    selectedInsightTypes,
    setSelectedInsightTypes,
    filters,
    setSelectedServices,
    selectedServices,
    isServicesFilterEnabled
  ]);

  const discardChanges = useCallback(() => {
    const newServices = globallySelectedServices ?? [];
    setSelectedServices(newServices);
    setSelectedInsightTypes(filteredInsightTypes);
    setIsCriticalOnly(filters.includes("criticality"));
    setIsUnreadOnly(filters.includes("unread"));

    getData({
      displayName: search,
      showDismissed: ViewMode.OnlyDismissed === viewMode,
      filters: [
        ...(filters.includes("criticality") ? ["criticality"] : []),
        ...(filters.includes("unread") ? ["unread"] : [])
      ] as InsightFilterType[],
      insightTypes: filteredInsightTypes,
      services: newServices,
      scopedSpanCodeObjectId: scopeSpanCodeObjectId
    });
  }, [
    filteredInsightTypes,
    filters,
    globallySelectedServices,
    search,
    scopeSpanCodeObjectId,
    viewMode,
    getData
  ]);

  // Close popup and discard changes on environment or scope changes
  useEffect(() => {
    if (
      previousEnvironmentId !== environmentId ||
      previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      setIsPopupOpen(false);
      discardChanges();
    }
  }, [
    discardChanges,
    environmentId,
    previousEnvironmentId,
    previousScopeSpanCodeObjectId,
    scopeSpanCodeObjectId
  ]);

  const handleApplyFiltersButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.APPLY_FILTERS_BUTTON_CLICKED);

    setIsPopupOpen(false);

    setFilteredInsightTypes(selectedInsightTypes);
    setFilters([
      ...(isCriticalOnly ? ["criticality"] : []),
      ...(isUnreadOnly ? ["unread"] : [])
    ] as InsightFilterType[]);
    if (isServicesFilterEnabled) {
      setGloballySelectedServices(selectedServices);
    }
  };

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CLEAR_ALL_FILTERS_BUTTON_CLICKED
    );

    setSelectedServices([]);
    setSelectedInsightTypes([]);
    setIsCriticalOnly(false);
    setIsUnreadOnly(false);
  };

  const handleIssueTypesChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED, {
      filterType: "issueType"
    });
    const newInsightTypes = Array.isArray(value) ? value : [value];
    setSelectedInsightTypes(newInsightTypes);
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

    setIsPopupOpen(false);
    discardChanges();
  };

  const handleFiltersButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FILTERS_BUTTON_CLICKED);
    setIsPopupOpen(!isPopupOpen);

    if (isPopupOpen) {
      discardChanges();
    }
  };

  const handleToggleFilterChange = (
    value: string | string[],
    filterType: InsightFilterType
  ) => {
    sendUserActionTrackingEvent(trackingEvents.FILTER_OPTION_SELECTED, {
      filterType
    });

    if (filterType === "criticality") {
      setIsCriticalOnly(value === filterType);
    }

    if (filterType === "unread") {
      setIsUnreadOnly(value === filterType);
    }

    const selectedFilters = new Set(filters);
    if (value === filterType) {
      selectedFilters.add(filterType);
    } else {
      selectedFilters.delete(filterType);
    }
  };

  const servicesFilterOptions: SelectItem[] =
    data?.services?.map((entry) => ({
      value: entry,
      label: entry,
      enabled: true,
      selected: selectedServices.includes(entry)
    })) ?? [];

  const issueTypesFilterOptions: SelectItem[] =
    data?.issueTypeFilters?.map((entry) => ({
      value: entry.name,
      label: getInsightTypeInfo(entry.name)?.label ?? entry.name,
      enabled: entry.enabled || selectedInsightTypes.includes(entry.name),
      selected: selectedInsightTypes.includes(entry.name) && entry.enabled
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
    selectedInsightTypes.length +
    (isServicesFilterEnabled ? selectedServices.length : 0) +
    (isCriticalOnly ? 1 : 0) +
    (isUnreadOnly ? 1 : 0);

  const appliedFiltersCount =
    filteredInsightTypes.length +
    (isServicesFilterEnabled ? (globallySelectedServices ?? []).length : 0) +
    (filters.includes("criticality") ? 1 : 0) +
    (filters.includes("unread") ? 1 : 0);

  const filterComponents = [
    ...(isServicesFilterEnabled
      ? [
          {
            title: "Services",
            component: (
              <s.StyledSelect
                key={"services"}
                items={servicesFilterOptions}
                onChange={handleServiceChange}
                placeholder={selectedServices.length > 0 ? "Services" : "All"}
                multiselect={true}
                icon={(props: IconProps) => (
                  <s.InsightIconContainer>
                    <WrenchIcon {...props} />
                  </s.InsightIconContainer>
                )}
                disabled={issueTypesFilterOptions?.length === 0}
              />
            )
          }
        ]
      : []),
    {
      title: "Issues",
      component: (
        <s.StyledSelect
          key={"issues"}
          items={issueTypesFilterOptions}
          onChange={handleIssueTypesChange}
          placeholder={selectedInsightTypes.length > 0 ? "Issues" : "All"}
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

  return (
    <FilterPopup
      isOpen={isPopupOpen}
      onApply={handleApplyFiltersButtonClick}
      onClearAll={handleClearFiltersButtonClick}
      onClose={handleCloseButtonClick}
      title={"Filters"}
      selectedFiltersCount={selectedFiltersCount}
      appliedFiltersCount={appliedFiltersCount}
      filters={filterComponents}
      onFiltersButtonClick={handleFiltersButtonClick}
    />
  );
};