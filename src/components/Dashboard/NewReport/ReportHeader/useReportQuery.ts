import { useEffect, useState } from "react";
import { usePrevious } from "../../../../hooks/usePrevious";
import { isEnvironment } from "../../../../typeGuards/isEnvironment";
import { isNumber } from "../../../../typeGuards/isNumber";
import { Environment } from "../../../common/App/types";
import { ReportFilterQuery } from "../types";
import { ReportTimeMode } from "./types";

export const useReportQuery = ({
  selectedEnvironment,
  selectedServices,
  timeMode,
  periodInDays,
  services
}: {
  selectedEnvironment: Environment | null;
  selectedServices: string[];
  timeMode: ReportTimeMode;
  periodInDays: number;
  services?: string[];
}) => {
  const [filterQuery, setFilterQuery] = useState<ReportFilterQuery>({
    lastDays: null,
    services: [],
    environmentId: null,
    criticalities: []
  });
  const previousTimeMode = usePrevious(timeMode);
  const previousSelectedServices = usePrevious(selectedServices);
  const previousEnvironment = usePrevious(selectedEnvironment?.id);
  const previousPeriod = usePrevious(periodInDays);

  useEffect(() => {
    if (!selectedEnvironment?.id) {
      return;
    }

    setFilterQuery({
      lastDays: timeMode === "baseline" ? null : periodInDays,
      services: selectedServices.length > 0 ? selectedServices : services ?? [],
      environmentId: selectedEnvironment?.id ?? null,
      criticalities: []
    });
  }, [services, selectedEnvironment]);

  useEffect(() => {
    if (
      !selectedEnvironment?.id ||
      services?.length === 0 ||
      previousEnvironment !== selectedEnvironment.id
    ) {
      return;
    }

    if (
      previousTimeMode !== timeMode ||
      (isEnvironment(selectedEnvironment) &&
        previousEnvironment !== selectedEnvironment.id) ||
      previousSelectedServices !== selectedServices ||
      (isNumber(periodInDays) && previousPeriod !== periodInDays)
    ) {
      setFilterQuery({
        lastDays: timeMode === "baseline" ? null : periodInDays,
        services:
          selectedServices.length > 0 ? selectedServices : services ?? [],
        environmentId: selectedEnvironment?.id ?? null,
        criticalities: []
      });
    }
  }, [
    periodInDays,
    timeMode,
    selectedServices,
    selectedEnvironment,
    previousEnvironment,
    previousTimeMode,
    previousPeriod,
    previousSelectedServices,
    services
  ]);

  return { filterQuery };
};
