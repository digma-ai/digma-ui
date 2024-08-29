import { Row, createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";
import { SCALING_ISSUE_DOCUMENTATION_URL } from "../../../constants";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { useScopeStore } from "../../../containers/Main/stores/useScopeStore";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../utils/getDurationString";
import { InsightStatus } from "../../Insights/types";
import { SCOPE_CHANGE_EVENTS } from "../../Main/types";
import { useHistory } from "../../Main/useHistory";
import { TAB_IDS } from "../../Navigation/Tabs/types";
import { CrossCircleIcon } from "../../common/icons/16px/CrossCircleIcon";
import { MeterHighIcon } from "../../common/icons/16px/MeterHighIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { CheckCircleIcon } from "../../common/icons/20px/CheckCircleIcon";
import { Button } from "../../common/v3/Button";
import { Card } from "../../common/v3/Card";
import { Tag } from "../../common/v3/Tag";
import { EmptyStateCard } from "../EmptyStateCard";
import { addEnvironmentColumns } from "../TopIssues/highlightCards/addEnvironmentColumns";
import { EnvironmentData } from "../TopIssues/types";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
import { TableText } from "../common/TableText";
import { handleEnvironmentTableRowClick } from "../handleEnvironmentTableRowClick";
import { trackingEventNames, trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentScalingData, ScalingMetrics } from "./types";
import { useScalingData } from "./useScalingData";

const demoData: EnvironmentScalingData[] = [
  {
    environmentId: "1",
    environmentName: "Dev",
    insightStatus: InsightStatus.Active,
    criticality: 0.7,
    metrics: {
      concurrency: 31,
      duration: {
        value: 225.86,
        unit: "sec",
        raw: 225860000000
      }
    }
  },
  {
    environmentId: "2",
    environmentName: "Prod",
    insightStatus: InsightStatus.InEvaluation,
    criticality: 0.5,
    metrics: {
      concurrency: 12,
      duration: {
        value: 4.98,
        unit: "sec",
        raw: 4980000000
      }
    }
  },
  {
    environmentId: "3",
    environmentName: "Stage",
    insightStatus: InsightStatus.Regression,
    criticality: 0.1,
    metrics: {
      concurrency: 43,
      duration: {
        value: 2001.12,
        unit: "sec",
        raw: 2001120000000
      }
    }
  }
];

export const Scaling = () => {
  const { data, getData } = useScalingData();
  const scope = useScopeStore().scope;
  const environments = useGlobalStore().environments;
  const { goTo } = useHistory();

  useEffect(() => {
    getData();
  }, [getData]);

  const renderScalingCard = (data: EnvironmentScalingData[]) => {
    const transformedData: EnvironmentData<ScalingMetrics>[] = data.map(
      (x) => ({
        environmentId: x.environmentId,
        environmentName: x.environmentName,
        insightStatus: x.insightStatus,
        insightCriticality: x.criticality,
        metrics: x.metrics
      })
    );

    const columnHelper = createColumnHelper<EnvironmentData<ScalingMetrics>>();

    const metricsColumns = [
      columnHelper.accessor((x) => x.metrics.concurrency, {
        header: "Concurrency",
        cell: (info) => {
          const value = info.getValue();
          const concurrencyString = String(value);

          return (
            <TableText title={concurrencyString}>{concurrencyString}</TableText>
          );
        }
      }),
      columnHelper.accessor((x) => x.metrics.duration, {
        header: "Duration",
        cell: (info) => {
          const value = info.getValue();
          const durationString = getDurationString(value);

          return <TableText title={durationString}>{durationString}</TableText>;
        }
      })
    ];

    const columns = addEnvironmentColumns(columnHelper, metricsColumns);

    const handleTableRowClick = (row: Row<EnvironmentData<ScalingMetrics>>) => {
      sendUserActionTrackingEvent(
        trackingEvents.SCALING_CARD_TABLE_ROW_CLICKED
      );
      handleEnvironmentTableRowClick(
        scope,
        environments,
        row.original.environmentId,
        SCOPE_CHANGE_EVENTS.HIGHLIGHTS_SCALING_CARD_ITEM_CLICKED
      );
    };

    return (
      <Card
        header={
          <s.CardTitle>
            <Tag
              content={
                <s.CardIconContainer>
                  <MeterHighIcon color={"currentColor"} size={16} />
                </s.CardIconContainer>
              }
            />
            Scaling badly
          </s.CardTitle>
        }
        content={
          <Table<EnvironmentData<ScalingMetrics>>
            columns={columns}
            data={transformedData}
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
          Source: "Scaling Issue"
        }
      );

      openURLInDefaultBrowser(SCALING_ISSUE_DOCUMENTATION_URL);
    };

    const handleViewAnalyticsButtonClick = () => {
      sendUserActionTrackingEvent(
        trackingEvents.SCALING_CARD_VIEW_ANALYTICS_BUTTON_CLICKED
      );

      goTo(`/${TAB_IDS.ANALYTICS}`);
    };

    if (!data) {
      return null;
    }

    if (data?.dataState === "NoData") {
      return (
        <EmptyStateCard
          blurredContent={renderScalingCard(demoData)}
          icon={CrossCircleIcon}
          title={"Unlock Scaling Issues"}
          text={"Connect a CI/Prod environment to run code at scale"}
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

    if (data?.dataState === "Partial") {
      return (
        <EmptyStateCard
          blurredContent={renderScalingCard(demoData)}
          type={"lowSeverity"}
          icon={RefreshIcon}
          title={"Collecting data"}
          text={"Trigger more concurrent actions to test scaling"}
        />
      );
    }

    if (data?.dataState === "ScalingWell") {
      return (
        <EmptyStateCard
          type={"success"}
          icon={CheckCircleIcon}
          title={"No scaling issue found"}
          text={"Looks like this asset is scaling well"}
          customContent={
            <Button
              buttonType={"secondary"}
              onClick={handleViewAnalyticsButtonClick}
              label={"View analytics"}
            />
          }
        />
      );
    }

    return renderScalingCard(data.scaling);
  };

  return <Section>{renderCard()}</Section>;
};
