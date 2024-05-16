import {
  KeyboardEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isNumber } from "../../typeGuards/isNumber";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { ConfigContext } from "../common/App/ConfigContext";
import { MenuItem } from "../common/FilterMenu/types";
import { Pagination } from "../common/Pagination";
import { RegistrationDialog } from "../common/RegistrationDialog";
import { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { EnvironmentFilter } from "./EnvironmentFilter";
import { TestCard } from "./TestCard";
import { TestCardSkeleton } from "./TestCardSkeleton";
import { TestTicket } from "./TestTicket";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import {
  GetSpanLatestDataPayload,
  RegisterPayload,
  SetSpanLatestDataPayload,
  Test,
  TestsData,
  TestsProps
} from "./types";

const REFRESH_INTERVAL = isNumber(window.testsRefreshInterval)
  ? window.testsRefreshInterval
  : 10 * 1000; // in milliseconds

const renderPagination = (
  data: TestsData["paging"],
  onPageChange: (page: number) => void
) => {
  const page = data.pageNumber - 1;
  const pageStartItemNumber = page * data.pageSize + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + data.pageSize - 1,
    data.totalCount
  );

  return (
    <s.PaginationContainer>
      <s.ItemsCount>
        Showing{" "}
        <s.PageItemsCount>
          {pageStartItemNumber} - {pageEndItemNumber}
        </s.PageItemsCount>{" "}
        of {data.totalCount}
      </s.ItemsCount>
      {
        <Pagination
          itemsCount={data.totalCount}
          page={page}
          pageSize={data.pageSize}
          onPageChange={onPageChange}
        />
      }
    </s.PaginationContainer>
  );
};

export const Tests = (props: TestsProps) => {
  const [data, setData] = useState<SetSpanLatestDataPayload>();
  const previousData = usePrevious(data);
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
  const scopeSpan = config.scope?.span || null;
  const previousScopeSpan = usePrevious(scopeSpan);

  const environmentMenuItems: MenuItem[] = (config.environments || []).map(
    (environment) => ({
      value: environment.id,
      label: environment.name,
      selected: selectedEnvironments.includes(environment.id)
    })
  );

  const environmentsToSend = useMemo(
    () => ({
      environments:
        selectedEnvironments.length > 0
          ? selectedEnvironments
          : (config.environments || []).map((x) => x.id)
    }),
    [selectedEnvironments, config.environments]
  );
  const previousEnvironmentsToSend = usePrevious(environmentsToSend);

  useEffect(() => {
    sendTrackingEvent(trackingEvents.PAGE_LOADED);

    window.sendMessageToDigma<GetSpanLatestDataPayload>({
      action: actions.GET_SPAN_LATEST_DATA,
      payload: {
        ...environmentsToSend,
        pageNumber: 1,
        scope: scopeSpan
      }
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
        window.sendMessageToDigma<GetSpanLatestDataPayload>({
          action: actions.GET_SPAN_LATEST_DATA,
          payload: {
            ...environmentsToSend,
            pageNumber: data?.data?.paging.pageNumber || 1,
            scope: scopeSpan
          }
        });
      }, REFRESH_INTERVAL);
    }
  }, [
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    environmentsToSend,
    data,
    scopeSpan
  ]);

  useEffect(() => {
    if (
      (previousEnvironmentsToSend &&
        previousEnvironmentsToSend !== environmentsToSend) ||
      previousScopeSpan !== scopeSpan
    ) {
      window.sendMessageToDigma<GetSpanLatestDataPayload>({
        action: actions.GET_SPAN_LATEST_DATA,
        payload: {
          ...environmentsToSend,
          scope: scopeSpan,
          pageNumber: 1
        }
      });
    }
  }, [
    previousEnvironmentsToSend,
    environmentsToSend,
    previousScopeSpan,
    scopeSpan
  ]);

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
    testsListRef.current?.scrollTo(0, 0);
  }, [data?.data?.paging.pageNumber, selectedEnvironments, scopeSpan]);

  const openJiraTicketPopup = (test: Test) => {
    setTestToOpenTicketPopup(test);
  };

  const closeJiraTicketPopup = () => {
    setTestToOpenTicketPopup(undefined);
  };

  const handleRegistrationSubmit = (formData: RegistrationFormValues) => {
    window.sendMessageToDigma<RegisterPayload>({
      action: globalActions.PERSONALIZE_REGISTER,
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

  const handlePageChange = (page: number) => {
    window.sendMessageToDigma<GetSpanLatestDataPayload>({
      action: actions.GET_SPAN_LATEST_DATA,
      payload: {
        ...environmentsToSend,
        scope: scopeSpan,
        pageNumber: page + 1
      }
    });
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setTestToOpenTicketPopup(undefined);
    }
  };

  const renderContent = () => {
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
        {data?.data?.paging &&
          renderPagination(data.data.paging, handlePageChange)}
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
      <s.StyledFadingContentSwitch switchFlag={isInitialLoading}>
        <s.ContentContainer>
          <s.TestsList>
            <TestCardSkeleton />
            <TestCardSkeleton />
            <TestCardSkeleton />
          </s.TestsList>
        </s.ContentContainer>
        {renderContent()}
      </s.StyledFadingContentSwitch>
      {testToOpenTicketPopup && (
        <s.Overlay onKeyDown={handleOverlayKeyDown} tabIndex={-1}>
          <s.PopupContainer>
            {/* {config.userRegistrationEmail ? ( */}
            {true ? ( // eslint-disable-line no-constant-condition
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
