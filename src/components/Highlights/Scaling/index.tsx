import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect } from "react";
import { actions as globalActions } from "../../../actions";
import { ROUTES } from "../../../constants";
import { ChangeViewPayload } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../utils/getDurationString";
import { ConfigContext } from "../../common/App/ConfigContext";
import { CheckCircleIcon } from "../../common/icons/20px/CheckCircleIcon";
import { Button } from "../../common/v3/Button";
import { Card } from "../../common/v3/Card";
import { EmptyStateCard } from "../EmptyStateCard";
import { addEnvironmentColumns } from "../TopIssues/highlightCards/addEnvironmentColumns";
import { EnvironmentData } from "../TopIssues/types";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
import { TableText } from "../common/TableText";
import { handleEnvironmentTableRowClick } from "../handleEnvironmentTableRowClick";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentScalingData } from "./types";
import { useScalingData } from "./useScalingData";

export const Scaling = () => {
  const { data, getData } = useScalingData();
  const config = useContext(ConfigContext);

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
        config.environments,
        row.original.environmentId,
        ROUTES.INSIGHTS
      );
    };

    return (
      <Card
        header={<s.CardTitle>Scaling badly</s.CardTitle>}
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
    const handleViewAnalyticsButtonClick = () => {
      sendUserActionTrackingEvent(
        trackingEvents.SCALING_CARD_VIEW_ANALYTICS_BUTTON_CLICKED
      );

      window.sendMessageToDigma<ChangeViewPayload>({
        action: globalActions.CHANGE_VIEW,
        payload: {
          view: ROUTES.ANALYTICS
        }
      });
    };

    // TODO: show the card for partial data
    // if (false) {
    //   return (
    //     <EmptyStateCard
    //       type={"lowSeverity"}
    //       icon={RefreshIcon}
    //       title={"Collecting data"}
    //       text={"Trigger more concurrent actions to test scaling"}
    //     />
    //   );
    // }

    // TODO: change the condition
    if (!data || data.scaling.length === 0) {
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

  return <Section title={"Scaling"}>{renderCard()}</Section>;
};
