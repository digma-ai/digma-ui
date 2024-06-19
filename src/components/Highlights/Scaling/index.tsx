import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SCALING_ISSUE_DOCUMENTATION_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../utils/getDurationString";
import { InsightStatus } from "../../Insights/types";
import { TAB_IDS } from "../../Navigation/Tabs/types";
import { ConfigContext } from "../../common/App/ConfigContext";
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
import { EnvironmentScalingData } from "./types";
import { useScalingData } from "./useScalingData";

const demoData: EnvironmentData<EnvironmentScalingData>[] = [
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
  const config = useContext(ConfigContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const renderScalingCard = (
    data: EnvironmentData<EnvironmentScalingData>[]
  ) => {
    const columnHelper =
      createColumnHelper<EnvironmentData<EnvironmentScalingData>>();

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

    const handleTableRowClick = (
      row: Row<EnvironmentData<EnvironmentScalingData>>
    ) => {
      sendUserActionTrackingEvent(
        trackingEvents.SCALING_CARD_TABLE_ROW_CLICKED
      );
      handleEnvironmentTableRowClick(
        config.scope,
        config.environments,
        row.original.environmentId,
        TAB_IDS.ISSUES
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
          <Table<EnvironmentData<EnvironmentScalingData>>
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
          Source: "Scaling Issue"
        }
      );

      openURLInDefaultBrowser(SCALING_ISSUE_DOCUMENTATION_URL);
    };

    const handleViewAnalyticsButtonClick = () => {
      sendUserActionTrackingEvent(
        trackingEvents.SCALING_CARD_VIEW_ANALYTICS_BUTTON_CLICKED
      );

      navigate(TAB_IDS.ANALYTICS);
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
