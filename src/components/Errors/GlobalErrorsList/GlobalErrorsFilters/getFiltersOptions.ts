import { fetchData } from "../../../../utils/fetchData";
import { actions } from "../../actions";
import {
  EndpointFilterData,
  GetGlobalErrorsFiltersDataPayload,
  SetGlobalErrorsFiltersDataPayload
} from "./types";

export interface FiltersOptions {
  services: string[];
  endpoints: EndpointFilterData[];
  errorTypes: string[];
}

const toFiltersOptions = (
  filtersData: SetGlobalErrorsFiltersDataPayload
): Partial<FiltersOptions> => {
  const servicesData = filtersData.filters.find(
    (filter) => filter.filterName === "Services"
  );

  const endpointsData = filtersData.filters.find(
    (filter) => filter.filterName === "Endpoints"
  );

  const errorTypesData = filtersData.filters.find(
    (filter) => filter.filterName === "ErrorTypes"
  );

  return {
    ...(servicesData ? { services: servicesData.values as string[] } : {}),
    ...(endpointsData
      ? { endpoints: endpointsData.values as EndpointFilterData[] }
      : {}),
    ...(errorTypesData ? { errorTypes: errorTypesData.values as string[] } : {})
  };
};

const fetcherConfig = {
  requestAction: actions.GET_GLOBAL_ERRORS_FILTERS_DATA,
  responseAction: actions.SET_GLOBAL_ERRORS_FILTERS_DATA
};

export const getFiltersOptions = async (
  environmentId: string,
  selectedServices: string[],
  selectedEndpoints: string[]
): Promise<{
  services: string[];
  endpoints: EndpointFilterData[];
  errorTypes: string[];
}> => {
  const servicesData = await fetchData<
    GetGlobalErrorsFiltersDataPayload,
    SetGlobalErrorsFiltersDataPayload
  >(fetcherConfig, {
    environment: environmentId
  });

  const endpointsData =
    selectedServices && selectedServices.length > 0
      ? await fetchData<
          GetGlobalErrorsFiltersDataPayload,
          SetGlobalErrorsFiltersDataPayload
        >(fetcherConfig, {
          environment: environmentId,
          filterName: "Services",
          filterData: {
            values: selectedServices
          }
        })
      : undefined;

  const errorTypesData =
    selectedEndpoints && selectedEndpoints.length > 0
      ? await fetchData<
          GetGlobalErrorsFiltersDataPayload,
          SetGlobalErrorsFiltersDataPayload
        >(fetcherConfig, {
          environment: environmentId,
          filterName: "Endpoints",
          filterData: {
            values: selectedEndpoints,
            services: selectedServices
          }
        })
      : undefined;

  const filtersOptions: FiltersOptions = {
    ...(toFiltersOptions(servicesData) as FiltersOptions),
    ...(endpointsData ? toFiltersOptions(endpointsData) : {}),
    ...(errorTypesData ? toFiltersOptions(errorTypesData) : {})
  };

  return filtersOptions;
};
