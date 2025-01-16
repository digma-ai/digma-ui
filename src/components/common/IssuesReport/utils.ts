import type {
  EndpointIssuesData,
  GetEnvironmentsResponse,
  ServiceIssuesData
} from "../../../redux/services/types";
import type { Severity } from "./Table/types";
import type { PresentationalReportData, ScoreCriterion } from "./types";

const getSeverity = (min: number, max: number, value: number): Severity => {
  const normalizedMin = Math.max(min, 0);
  const range = max - normalizedMin;
  const lowThreshold = normalizedMin + 0.15 * range;
  const mediumThreshold = normalizedMin + 0.5 * range;
  const highThreshold = normalizedMin + 0.85 * range;

  if (value <= lowThreshold) {
    return "Low";
  }

  if (value <= mediumThreshold) {
    return "Medium";
  }

  if (value <= highThreshold) {
    return "High";
  }

  return "Top";
};

export const transformServicesData = (
  data: ServiceIssuesData[],
  scoreCriterion: ScoreCriterion
): PresentationalReportData[] => {
  const scores = data.map((x) => x[scoreCriterion]);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  return data.map((x) => ({
    id: x.key.service,
    name: x.key.service,
    criticalIssuesCount: x.issues,
    score: Math.round(x[scoreCriterion] * 100),
    severity: getSeverity(minScore, maxScore, x[scoreCriterion])
  }));
};

export const transformEndpointsData = (
  data: EndpointIssuesData[],
  scoreCriterion: ScoreCriterion
): PresentationalReportData[] => {
  const scores = data.map((x) => x[scoreCriterion]);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  return data.map((x) => ({
    id: x.spanCodeObjectId,
    name: x.displayName,
    criticalIssuesCount: x.issues,
    score: Math.round(x[scoreCriterion] * 100),
    severity: getSeverity(minScore, maxScore, x[scoreCriterion])
  }));
};

export const sortEnvironments = (
  environments: GetEnvironmentsResponse
): GetEnvironmentsResponse =>
  [...environments].sort((a, b) => a.name.localeCompare(b.name));
