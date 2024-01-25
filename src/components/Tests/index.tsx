import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isNumber } from "../../typeGuards/isNumber";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { MenuItem } from "../Assets/FilterMenu/types";
import { ConfigContext } from "../common/App/ConfigContext";
import { NewCircleLoader } from "../common/NewCircleLoader";
import { Pagination } from "../common/Pagination";
import { RegistrationDialog } from "../common/RegistrationDialog";
import { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { EnvironmentFilter } from "./EnvironmentFilter";
import { TestCard } from "./TestCard";
import { TestTicket } from "./TestTicket";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { SetSpanLatestDataPayload, Test, TestsProps } from "./types";

const PAGE_SIZE = 10;
const REFRESH_INTERVAL = isNumber(window.testsRefreshInterval)
  ? window.testsRefreshInterval
  : 10 * 1000; // in milliseconds

export const Tests = (props: TestsProps) => {
  const [data, setData] = useState<SetSpanLatestDataPayload>();
  const previousData = usePrevious(data);
  const [page, setPage] = useState(0);
  const refreshTimerId = useRef<number>();
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const config = useContext(ConfigContext);
  const [testToOpenTicketPopup, setTestToOpenTicketPopup] = useState<Test>();
  const previousUserRegistrationEmail = usePrevious(
    config.userRegistrationEmail
  );
  useState(false);
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>(
    []
  );
  const testsListRef = useRef<HTMLDivElement>(null);

  const totalCount = data?.data?.paging.totalCount || 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );

  const environmentMenuItems: MenuItem[] = (config.environments || []).map(
    (environment) => ({
      value: environment.originalName,
      label: environment.name,
      selected: selectedEnvironments.includes(environment.originalName)
    })
  );

  const payloadToSend = useMemo(
    () => ({
      environments:
        selectedEnvironments.length > 0
          ? selectedEnvironments
          : (config.environments || []).map((x) => x.originalName),
      pageNumber: page + 1,
      pageSize: PAGE_SIZE
    }),
    [page, selectedEnvironments, config.environments]
  );
  const previousPayloadToSend = usePrevious(payloadToSend);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    sendTrackingEvent(trackingEvents.PAGE_LOADED);

    window.sendMessageToDigma({
      action: actions.GET_SPAN_LATEST_DATA,
      payload: payloadToSend
    });
    setIsInitialLoading(true);

    const handleSetSpanLatestData = (data: unknown, timeStamp: number) => {
      setData(data as SetSpanLatestDataPayload);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      actions.SET_SPAN_LATEST_DATA,
      handleSetSpanLatestData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_SPAN_LATEST_DATA,
        handleSetSpanLatestData
      );
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        window.sendMessageToDigma({
          action: actions.GET_SPAN_LATEST_DATA,
          payload: payloadToSend
        });
      }, REFRESH_INTERVAL);
    }
  }, [previousLastSetDataTimeStamp, lastSetDataTimeStamp, payloadToSend]);

  useEffect(() => {
    if (previousPayloadToSend && previousPayloadToSend !== payloadToSend) {
      window.sendMessageToDigma({
        action: actions.GET_SPAN_LATEST_DATA,
        payload: payloadToSend
      });
    }
  }, [previousPayloadToSend, payloadToSend]);

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== config.userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationInProgress(false);
    }
  }, [
    config.userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  useEffect(() => {
    setPage(0);
    testsListRef.current?.scrollTo(0, 0);
  }, [config.scope, selectedEnvironments]);

  const openJiraTicketPopup = (test: Test) => {
    setTestToOpenTicketPopup(test);
  };

  const closeJiraTicketPopup = () => {
    setTestToOpenTicketPopup(undefined);
  };

  const handleRegistrationSubmit = (formData: RegistrationFormValues) => {
    window.sendMessageToDigma({
      action: globalActions.REGISTER,
      payload: {
        ...formData,
        scope: "insights view jira ticket info"
      }
    });

    setIsRegistrationInProgress(true);
  };

  const handleRegistrationDialogClose = () => {
    setTestToOpenTicketPopup(undefined);
  };

  const handleEnvironmentMenuItemClick = (environment: string) => {
    const oldSelectedEnvironments = selectedEnvironments || [];
    const environmentIndex = oldSelectedEnvironments.findIndex(
      (x) => x === environment
    );

    if (environmentIndex < 0) {
      setSelectedEnvironments([...oldSelectedEnvironments, environment]);
    } else {
      setSelectedEnvironments([
        ...oldSelectedEnvironments.slice(0, environmentIndex),
        ...oldSelectedEnvironments.slice(environmentIndex + 1)
      ]);
    }
  };

  const renderContent = () => {
    if (isInitialLoading) {
      return (
        <s.NoDataContainer>
          <NewCircleLoader size={32} />
        </s.NoDataContainer>
      );
    }

    if (data?.error) {
      return <s.NoDataContainer>{data.error.message}</s.NoDataContainer>;
    }

    if (data?.data?.entries.length === 0) {
      return (
        <s.NoDataContainer>
          <span>Run tests with Digma</span>
          <span>
            Run your test with Digma enabled to see related tests and insights
          </span>
        </s.NoDataContainer>
      );
    }

    return (
      <s.ContentContainer>
        <s.TestsList ref={testsListRef}>
          {data?.data?.entries.map((x) => {
            const key = `${x.environmentId}-${x.name}`;
            return (
              <TestCard
                key={key}
                test={x}
                spanContexts={data.data?.spanContexts || []}
                onTicketInfoOpen={openJiraTicketPopup}
              />
            );
          })}
        </s.TestsList>
        <s.Footer>
          <s.ItemsCount>
            Showing{" "}
            <s.PageItemsCount>
              {pageStartItemNumber} - {pageEndItemNumber}
            </s.PageItemsCount>{" "}
            of {totalCount}
          </s.ItemsCount>
          <Pagination
            itemsCount={totalCount}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </s.Footer>
      </s.ContentContainer>
    );
  };

  return (
    <s.Container>
      <s.EnvironmentFilterContainer>
        Environment
        <EnvironmentFilter
          items={environmentMenuItems}
          isLoading={config.environments === undefined}
          onMenuItemClick={handleEnvironmentMenuItemClick}
        />
      </s.EnvironmentFilterContainer>
      {renderContent()}
      {testToOpenTicketPopup && (
        <s.Overlay>
          <s.PopupContainer>
            {config.userRegistrationEmail ? (
              <TestTicket
                test={testToOpenTicketPopup}
                spanContexts={data?.data?.spanContexts || []}
                onClose={closeJiraTicketPopup}
              />
            ) : (
              <RegistrationDialog
                onSubmit={handleRegistrationSubmit}
                onClose={handleRegistrationDialogClose}
                isRegistrationInProgress={isRegistrationInProgress}
              />
            )}
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
