import type { IssueCriticality } from "../../../../redux/services/types";
import type {
  IssuesReportTimeMode,
  IssuesReportViewLevel,
  IssuesReportViewMode
} from "../../../../redux/slices/issuesReportSlice";

export interface HeaderProps {
  viewMode: IssuesReportViewMode;
  viewLevel: IssuesReportViewLevel;
  timeMode: IssuesReportTimeMode;
  selectedEnvironmentId: string | null;
  selectedService: string | null;
  criticalityLevels: IssueCriticality[];
  periodInDays: number;
  selectedEndpoints: string[];
  selectedServices: string[];
  onSelectedEnvironmentIdChange: (environmentId: string) => void;
  onSelectedServicesChange: (services: string[]) => void;
  onSelectedEndpointsChange: (endpoints: string[]) => void;
  onCriticalityLevelsChange: (criticalities: IssueCriticality[]) => void;
  onPeriodInDaysChange: (periodInDays: number) => void;
  onTimeModeChange: (timeMode: IssuesReportTimeMode) => void;
  onViewModeChange: (viewMode: IssuesReportViewMode) => void;
  onGoBack: () => void;
  defaultTitle: string;
}
