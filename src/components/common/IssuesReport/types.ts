import type {
  EndpointData,
  Environment,
  GetAboutResponse,
  IssueCriticality
} from "../../../redux/services/types";
import type {
  IssuesReportTimeMode,
  IssuesReportViewLevel,
  IssuesReportViewMode
} from "../../../redux/slices/issuesReportSlice";
import type { Severity } from "../../common/IssuesReport/Table/types";
import type { BackendInfo } from "../App/types";

export interface TargetScope {
  value: string;
  displayName?: string;
}

export interface IssuesReportProps {
  backendInfo?: BackendInfo | GetAboutResponse | null;
  environments?: Environment[] | null;
  viewMode: IssuesReportViewMode;
  viewLevel: IssuesReportViewLevel;
  timeMode: IssuesReportTimeMode;
  selectedEnvironmentId: string | null;
  selectedService: string | null;
  criticalityLevels: IssueCriticality[];
  periodInDays: number;
  selectedEndpoints: EndpointData[];
  selectedServices: string[];
  defaultHeaderTitle: string;
  onSelectedEnvironmentIdChange: (environmentId: string) => void;
  onSelectedServicesChange: (services: string[]) => void;
  onSelectedEndpointsChange: (endpoints: EndpointData[]) => void;
  onCriticalityLevelsChange: (criticalities: IssueCriticality[]) => void;
  onPeriodInDaysChange: (periodInDays: number) => void;
  onTimeModeChange: (timeMode: IssuesReportTimeMode) => void;
  onViewModeChange: (viewMode: IssuesReportViewMode) => void;
  onTileTitleClick?: (
    viewLevel: IssuesReportViewLevel,
    target: TargetScope
  ) => void;
  onTileIssuesStatsClick: (
    viewLevel: IssuesReportViewLevel,
    timeMode: IssuesReportTimeMode,
    target: TargetScope
  ) => void;
  onSelectedServiceChange: (service: string | null) => void;
  activeTileIds?: string[];
  showEnvironmentSelect?: boolean;
  showServicesSelect?: boolean;
}

export type ScoreCriterion = "impact" | "criticality";

export interface PresentationalReportData {
  id: string;
  name: string;
  score: number;
  criticalIssuesCount: number;
  severity: Severity;
}
