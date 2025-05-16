import { useEffect, useState } from "react";
import { useGetGlobalErrorFiltersQuery } from "../../../../redux/services/digma";
import type {
  EndpointFilterData,
  GetGlobalErrorsFiltersResponse
} from "../../../../redux/services/types";

export interface FiltersOptions {
  services: string[];
  endpoints: EndpointFilterData[];
  errorTypes: string[];
}

const toFiltersOptions = (
  filtersData: GetGlobalErrorsFiltersResponse
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

export const useFiltersOptions = (
  environmentId: string | undefined,
  selectedServices: string[],
  selectedEndpoints: string[],
  isEnabled: boolean
): { data: FiltersOptions | undefined; isLoaded: boolean } => {
  const [data, setData] = useState<FiltersOptions | undefined>(undefined);

  const { data: servicesData, isSuccess: isServicesDataSuccess } =
    useGetGlobalErrorFiltersQuery(
      {
        environment: environmentId ?? ""
      },
      {
        skip: !isEnabled
      }
    );

  const { data: endpointsData, isSuccess: isEndpointsDataSuccess } =
    useGetGlobalErrorFiltersQuery(
      {
        environment: environmentId ?? "",
        filterName: "Services",
        filterData: {
          values: selectedServices
        }
      },
      {
        skip: !isEnabled
      }
    );

  const { data: errorTypesData, isSuccess: isErrorTypesDataSuccess } =
    useGetGlobalErrorFiltersQuery(
      {
        environment: environmentId ?? "",
        filterName: "Endpoints",
        filterData: {
          values: selectedEndpoints,
          services: selectedServices
        }
      },
      {
        skip: !isEnabled
      }
    );

  useEffect(() => {
    setData(undefined);
  }, [isEnabled]);

  useEffect(() => {
    if (servicesData) {
      const mergedOptions: FiltersOptions = {
        ...(toFiltersOptions(servicesData) as FiltersOptions),
        ...(endpointsData ? toFiltersOptions(endpointsData) : {}),
        ...(errorTypesData ? toFiltersOptions(errorTypesData) : {})
      };
      setData(mergedOptions);
    }
  }, [servicesData, endpointsData, errorTypesData]);

  const isLoaded =
    isServicesDataSuccess &&
    (!selectedServices.length || isEndpointsDataSuccess) &&
    (!selectedEndpoints.length || isErrorTypesDataSuccess);

  return { data, isLoaded };
};
