import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { PERFORMANCE_IMPACT_DOCUMENTATION_URL } from "../../../constants";
import { usePrevious } from "../../../hooks/usePrevious";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { getImpactScoreLabel } from "../../common/ImpactScore";
import { Button } from "../../common/v3/Button";
import { Card } from "../../common/v3/Card";
import { Tag } from "../../common/v3/Tag";
import { EmptyStateCard } from "../EmptyStateCard";
import { EnvironmentName } from "../common/EnvironmentName";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
import { TableText } from "../common/TableText";
import { handleEnvironmentTableRowClick } from "../handleEnvironmentTableRowClick";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentImpactData } from "./types";
import { useImpactData } from "./useImpactData";

const getRankTagType = (rankCriticality: number) => {
  if (rankCriticality >= 0.9) {
    return "highSeverity";
  }

  if (rankCriticality >= 0.5) {
    return "mediumSeverity";
  }

  return "lowSeverity";
};

export const Impact = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { data, getData } = useImpactData();
  const previousData = usePrevious(data);
  const config = useContext(ConfigContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

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
          const tagType = getRankTagType(value.rankCriticality);

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
        "/analytics"
      );
    };

    return (
      <Card
        header={<s.CardTitle>Impact statistics</s.CardTitle>}
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

  const handleLearnMoreButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.IMPACT_CARD_LEARN_MORE_BUTTON_CLICKED
    );
    openURLInDefaultBrowser(PERFORMANCE_IMPACT_DOCUMENTATION_URL);
  };

  if (!config.backendInfo?.centralize) {
    return (
      <EmptyStateCard
        type={"unlock"}
        title={"Unlock Impact Analysis"}
        text={"Connect a CI environment to measure performance impact"}
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

  return (
    <Section title={"Impact"}>
      {data && data.impactHighlights.length > 0 ? (
        renderImpactCard(data.impactHighlights)
      ) : (
        <EmptyStateCard
          type={isInitialLoading ? "loading" : "noData"}
          text={
            isInitialLoading
              ? "Impact analysis is in progress"
              : "No impact data available"
          }
        />
      )}
    </Section>
  );
};
