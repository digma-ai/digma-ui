import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../../hooks/useStableSearchParams";
import { useGetIncidentQuery } from "../../../../../redux/services/digma";
import type {
  ArtifactType,
  IncidentArtifact
} from "../../../../../redux/services/types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { GitHubIssueIcon } from "../../../../common/icons/24px/GitHubIssueIcon";
import { GitHubPullRequestIcon } from "../../../../common/icons/24px/GitHubPullRequestIcon";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import { Table } from "../Table";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const columnHelper = createColumnHelper<IncidentArtifact>();

const getArtifactIcon = (type: ArtifactType) => {
  switch (type) {
    case "pr":
      return <GitHubPullRequestIcon color={"currentColor"} size={24} />;
    case "issue":
      return <GitHubIssueIcon color={"currentColor"} size={24} />;
    default:
      return null;
  }
};

export const Artifacts = () => {
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");
  const [isIncidentNotFound, setIsIncidentNotFound] = useState(false);

  const { data, error } = useGetIncidentQuery(
    {
      id: incidentId ?? ""
    },
    {
      skip: !incidentId,
      pollingInterval: isIncidentNotFound ? 0 : REFRESH_INTERVAL
    }
  );

  useEffect(() => {
    setIsIncidentNotFound(false);
  }, [incidentId]);

  useEffect(() => {
    if (error && "status" in error && error.status === 404) {
      setIsIncidentNotFound(true);
    }
  }, [error]);

  const artifacts = useMemo(
    () => [...(data?.related_artifacts ?? [])].sort((a, b) => a.id - b.id),
    [data?.related_artifacts]
  );

  const columns = [
    columnHelper.accessor((x) => x, {
      header: "Changes",
      meta: {
        width: "80%"
      },
      cell: (info) => {
        const artifact = info.getValue();

        const handleArtifactLinkClick = () => {
          sendUserActionTrackingEvent(
            trackingEvents.INCIDENT_ARTIFACTS_TABLE_ITEM_LINK_CLICKED,
            {
              agentId: agentId ?? ""
            }
          );
        };

        return (
          <s.ArtifactInfoContainer>
            <s.ArtifactIconContainer>
              {getArtifactIcon(artifact.type)}
            </s.ArtifactIconContainer>
            <Tooltip title={artifact.display_name}>
              <s.Link
                onClick={handleArtifactLinkClick}
                href={artifact.url}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {artifact.display_name}
              </s.Link>
            </Tooltip>
          </s.ArtifactInfoContainer>
        );
      }
    }),
    columnHelper.accessor("id", {
      header: "ID",
      meta: {
        width: "20%",
        textAlign: "right"
      },
      cell: (info) => {
        const id = info.getValue();
        return <s.ArtifactId>#{id}</s.ArtifactId>;
      }
    })
  ];

  return (
    <s.Container>
      <Table data={artifacts} columns={columns} />
    </s.Container>
  );
};
