import type { IssueCriticality } from "../../../redux/services/types";
import type {
  IssuesReportTimeMode,
  IssuesReportViewLevel,
  IssuesReportViewMode
} from "../../../redux/slices/issuesReportSlice";
import type { Severity } from "../../common/IssuesReport/Table/types";

export interface IssuesReportProps {
  viewMode: IssuesReportViewMode;
  viewLevel: IssuesReportViewLevel;
  timeMode: IssuesReportTimeMode;
  selectedEnvironmentId: string | null;
  selectedService: string | null;
  criticalityLevels: IssueCriticality[];
  periodInDays: number;
  selectedEndpoints: string[];
  selectedServices: string[];
  defaultHeaderTitle: string;
  onSelectedEnvironmentIdChange: (environmentId: string) => void;
  onSelectedServicesChange: (services: string[]) => void;
  onSelectedEndpointsChange: (endpoints: string[]) => void;
  onCriticalityLevelsChange: (criticalities: IssueCriticality[]) => void;
  onPeriodInDaysChange: (periodInDays: number) => void;
  onTimeModeChange: (timeMode: IssuesReportTimeMode) => void;
  onViewModeChange: (viewMode: IssuesReportViewMode) => void;
  onTileTitleClick?: (viewLevel: IssuesReportViewLevel, value: string) => void;
  onTileIssuesStatsClick: (
    viewLevel: IssuesReportViewLevel,
    target: { value: string; displayName?: string }
  ) => void;
  onViewLevelChange: (viewLevel: IssuesReportViewLevel) => void;
  onSelectedServiceChange: (service: string | null) => void;
  activeTileIds?: string[];
}

export type ScoreCriterion = "impact" | "criticality";

export interface PresentationalReportData {
  id: string;
  name: string;
  score: number;
  criticalIssuesCount: number;
  severity: Severity;
}
