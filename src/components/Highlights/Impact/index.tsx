import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect } from "react";
import {
  PERFORMANCE_IMPACT_DOCUMENTATION_URL,
  ROUTES
} from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { getImpactScoreLabel } from "../../common/ImpactScore";
import { InfinityIcon } from "../../common/icons/16px/InfinityIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { TargetIcon } from "../../common/icons/16px/TargetIcon";
import { Button } from "../../common/v3/Button";
import { Card } from "../../common/v3/Card";
import { Tag } from "../../common/v3/Tag";
import { EmptyStateCard } from "../EmptyStateCard";
import { EnvironmentName } from "../common/EnvironmentName";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
import { TableText } from "../common/TableText";
import { handleEnvironmentTableRowClick } from "../handleEnvironmentTableRowClick";
import { trackingEventNames, trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentImpactData } from "./types";
import { useImpactData } from "./useImpactData";

const demoData: EnvironmentImpactData[] = [
  {
    environmentName: "Prod",
    environmentId: "1",
    rank: 1,
    rankNormalized: 0.9,
    impact: 0.8
  },
  {
    environmentName: "Stage",
    environmentId: "2",
    rank: 2,
    rankNormalized: 0.5,
    impact: 0.4
  },
  {
    environmentName: "Dev",
    environmentId: "3",
    rank: 3,
    rankNormalized: 0.4,
    impact: 0.3
  }
];

const getRankTagType = (normalizedRank: number) => {
  if (normalizedRank >= 0.9) {
    return "highSeverity";
  }

  if (normalizedRank >= 0.5) {
    return "mediumSeverity";
  }

  return "lowSeverity";
};

export const Impact = () => {
  const { data, getData } = useImpactData();
  const config = useContext(ConfigContext);

  useEffect(() => {
    getData();
  }, []);

  const renderImpactCard = (data: EnvironmentImpactData[]) => {
    const columnHelper = createColumnHelper<EnvironmentImpactData>();

    const columns = [
      columnHelper.accessor("environmentName", {
        header: "Env",
        cell: (info) => {
          const environmentName = info.getValue();
          return <EnvironmentName name={environmentName} />;
        }
      }),
      columnHelper.accessor("impact", {
        header: "Impact",
        cell: (info) => {
          const value = info.getValue();
          const impactLabel = getImpactScoreLabel(value);

          return <TableText title={impactLabel}>{impactLabel}</TableText>;
        },
        meta: {
          contentAlign: "center",
          info: "The asset impact level represents how much it affects overall system performance"
        }
      }),
      columnHelper.accessor((x) => x, {
        header: "Rank",
        cell: (info) => {
          const value = info.getValue();
          const rank = value.rank;
          const tagType = getRankTagType(value.rankNormalized);

          return <Tag title={rank} content={rank} type={tagType} />;
        },
        meta: {
          contentAlign: "center",
          info: "The asset rank score indicates how high its impact is relative to other assets of the same category"
        }
      })
    ];

    const handleTableRowClick = (row: Row<EnvironmentImpactData>) => {
      sendUserActionTrackingEvent(trackingEvents.IMPACT_CARD_TABLE_ROW_CLICKED);
      handleEnvironmentTableRowClick(
        config.environments,
        row.original.environmentId,
        ROUTES.ANALYTICS
      );
    };

    return (
      <Card
        header={
          <s.CardTitle>
            <Tag
              content={
                <s.CardIconContainer>
                  <TargetIcon color={"currentColor"} size={16} />
                </s.CardIconContainer>
              }
            />
            Impact statistics
          </s.CardTitle>
        }
        content={
          <Table<EnvironmentImpactData>
            columns={columns}
            data={data}
            onRowClick={handleTableRowClick}
          />
        }
      />
    );
  };

  const renderCard = () => {
    const handleLearnMoreButtonClick = () => {
      sendUserActionTrackingEvent(
        trackingEventNames.CARD_LEARN_MORE_BUTTON_CLICKED,
        {
          Source: "Impact analysis"
        }
      );
      openURLInDefaultBrowser(PERFORMANCE_IMPACT_DOCUMENTATION_URL);
    };

    if (!config.backendInfo?.centralize) {
      return (
        <EmptyStateCard
          icon={InfinityIcon}
          title={"Unlock Impact Analysis"}
          text={"Connect a CI environment to measure performance impact"}
          blurredContent={renderImpactCard(demoData)}
          customContent={
            <Button
              buttonType={"secondary"}
              onClick={handleLearnMoreButtonClick}
              label={"Learn more"}
            />
          }
        />
      );
    }

    if (!data || data.impactHighlights.length === 0) {
      return (
        <EmptyStateCard
          type={"lowSeverity"}
          icon={RefreshIcon}
          title={"Waiting for more data"}
          text={"Impact analysis is in progress"}
          blurredContent={renderImpactCard(demoData)}
        />
      );
    }

    return renderImpactCard(data.impactHighlights);
  };

  return <Section>{renderCard()}</Section>;
};
