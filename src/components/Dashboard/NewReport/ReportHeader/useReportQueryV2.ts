import { useEffect, useState } from "react";
import { usePrevious } from "../../../../hooks/usePrevious";
import { Environment } from "../../../common/App/types";
import { ReportFilterQuery } from "../types";
import { ReportTimeMode } from "./types";

export const useReportQueryV2 = ({
  selectedEnvironment,
  selectedServices,
  timeMode,
  periodInDays,
  selectedCriticality
}: {
  selectedEnvironment: Environment | null;
  selectedServices: string[];
  timeMode: ReportTimeMode;
  periodInDays: number;
  selectedCriticality: string[];
}) => {
  const [filterQuery, setFilterQuery] = useState<ReportFilterQuery>({
    lastDays: null,
    services: [],
    environmentId: null,
    criticalities: []
  });
  const previousTimeMode = usePrevious(timeMode);

  useEffect(() => {
    if (selectedServices !== filterQuery.services) {
      setFilterQuery({ ...filterQuery, services: selectedServices });
    }
  }, [filterQuery, selectedServices]);

  useEffect(() => {
    if (timeMode === "baseline" && filterQuery.lastDays !== null) {
      setFilterQuery({ ...filterQuery, lastDays: null });
      return;
    }

    if (timeMode === "changes" && periodInDays !== filterQuery.lastDays) {
      setFilterQuery({ ...filterQuery, lastDays: periodInDays });
    }
  }, [periodInDays, filterQuery, timeMode, previousTimeMode]);

  useEffect(() => {
    if (selectedCriticality !== filterQuery.criticalities) {
      setFilterQuery({ ...filterQuery, criticalities: selectedCriticality });
    }
  }, [filterQuery, selectedCriticality]);

  useEffect(() => {
    if (!selectedEnvironment?.id) {
      return;
    }

    if (selectedEnvironment.id !== filterQuery.environmentId) {
      setFilterQuery({ ...filterQuery, environmentId: selectedEnvironment.id });
    }
  }, [filterQuery, selectedEnvironment]);

  return { filterQuery };
};
