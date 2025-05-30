import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useParams } from "react-router";
import { useGetIncidentQuery } from "../../../../../redux/services/digma";
import type {
  ArtifactType,
  IncidentArtifact
} from "../../../../../redux/services/types";
import { PullRequestIcon } from "../../../../common/icons/24px/PullRequestIcon";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { Table } from "../Table";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const columnHelper = createColumnHelper<IncidentArtifact>();

const getArtifactIcon = (type: ArtifactType) => {
  switch (type) {
    case "pr":
      return <PullRequestIcon color={"currentColor"} size={24} />;
    default:
      return null;
  }
};

export const Artifacts = () => {
  const params = useParams();
  const incidentId = params.id;

  const { data } = useGetIncidentQuery(
    {
      id: incidentId ?? ""
    },
    {
      skip: !incidentId,
      pollingInterval: REFRESH_INTERVAL
    }
  );

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

        return (
          <s.ArtifactInfoContainer>
            <s.ArtifactIconContainer>
              {getArtifactIcon(artifact.type)}
            </s.ArtifactIconContainer>
            <Tooltip title={artifact.display_name}>
              <s.Link
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
