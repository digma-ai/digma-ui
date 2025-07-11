import { type GetIncidentResponse } from "../../../redux/services/types";
import { mockedArtifacts } from "./AdditionalInfo/Artifacts/mockData";
import { mockedIncidentIssues } from "./AdditionalInfo/RelatedIssues/mockData";

export const mockedIncident: GetIncidentResponse = {
  id: "incident-123",
  name: "Sample Incident",
  status_description: "active",
  status: "active",
  affected_services: ["service-1", "service-2", "service-3", "service-4"],
  summary: "This is a summary of the incident.",
  related_issues: mockedIncidentIssues,
  related_artifacts: mockedArtifacts,
  status_timestamps: {
    active: "2023-10-01T12:00:00Z",
    closed: "2023-10-01T12:30:00Z"
  }
};
