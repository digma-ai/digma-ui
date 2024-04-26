import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { ROUTES } from "../../../constants";
import { usePrevious } from "../../../hooks/usePrevious";
import { ChangeViewPayload } from "../../../types";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { InfinityIcon } from "../../common/icons/16px/InfinityIcon";
import { PaperTabletIcon } from "../../common/icons/16px/PaperTabletIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { Button } from "../../common/v3/Button";
import { Tag } from "../../common/v3/Tag";
import { EmptyStateCard } from "../EmptyStateCard";
import { Section } from "../common/Section";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { useTestsData } from "./useTestsData";

export const Tests = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { data, getData } = useTestsData();
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

  const renderContent = () => {
    const handleLearnMoreButtonClick = () => {
      sendUserActionTrackingEvent(
        trackingEvents.TESTS_CARD_LEARN_MORE_BUTTON_CLICKED
      );

      // TODO: provide the correct URL
      openURLInDefaultBrowser("#");
    };

    const handleViewTestsButtonClick = () => {
      sendUserActionTrackingEvent(
        trackingEvents.TESTS_CARD_VIEW_TESTS_BUTTON_CLICKED
      );

      window.sendMessageToDigma<ChangeViewPayload>({
        action: globalActions.CHANGE_VIEW,
        payload: {
          view: ROUTES.TESTS
        }
      });
    };

    if (!config.backendInfo?.centralize) {
      return (
        <EmptyStateCard
          icon={InfinityIcon}
          title={"Run tests with Digma"}
          text={
            "Run your test with Digma enabled to see related tests and issues"
          }
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

    if (isInitialLoading) {
      return (
        <EmptyStateCard
          icon={RefreshIcon}
          type={"lowSeverity"}
          title={"Waiting for data"}
        />
      );
    }

    if (data) {
      return (
        <EmptyStateCard
          icon={PaperTabletIcon}
          type={"success"}
          title={"Tests Summary"}
          customContent={
            <>
              <s.TestsStatsContainer>
                <s.TestsStats>
                  Total
                  <Tag content={data.tests.totalCount} />
                </s.TestsStats>
                <s.TestsStats>
                  Failed
                  <Tag content={data.tests.failedCount} type={"highSeverity"} />
                </s.TestsStats>
              </s.TestsStatsContainer>
              <Button
                buttonType={"secondary"}
                onClick={handleViewTestsButtonClick}
                label={"View Tests"}
              />
            </>
          }
        />
      );
    }
  };

  return <Section title={"Tests"}>{renderContent()}</Section>;
};
