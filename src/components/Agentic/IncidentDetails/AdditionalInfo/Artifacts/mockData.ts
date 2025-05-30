import type { IncidentArtifact } from "../../../../../redux/services/types";

export const mockedArtifacts: IncidentArtifact[] = [
  {
    id: 1,
    type: "pr",
    display_name: "Artifact 1",
    url: "https://example.com/artifact-1"
  },
  {
    id: 2,
    type: "pr",
    display_name: "Artifact 2",
    url: "https://example.com/artifact-2"
  },
  {
    id: 3,
    type: "pr",
    display_name: "Artifact 3",
    url: "https://example.com/artifact-3"
  }
];
