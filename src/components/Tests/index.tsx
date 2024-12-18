import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { trackingEvents as globalEvents } from "../../trackingEvents";
import { isNull } from "../../typeGuards/isNull";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../Main/useHistory";
import { TAB_IDS } from "../Navigation/Tabs/types";
import type { MenuItem } from "../common/FilterMenu/types";
import { Pagination } from "../common/Pagination";
import { RegistrationDialog } from "../common/RegistrationDialog";
import type { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { NewButton } from "../common/v3/NewButton";
import { EmptyState } from "./EmptyState";
import { EnvironmentFilter } from "./EnvironmentFilter";
import { TestCard } from "./TestCard";
import { TestTicket } from "./TestTicket";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type {
  GetSpanLatestDataPayload,
  RegisterPayload,
  SetSpanLatestDataPayload,
  Test,
  TestsData
} from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

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

export const Tests = () => {
  const [data, setData] = useState<SetSpanLatestDataPayload>();
  const previousData = usePrevious(data);
  const refreshTimerId = useRef<number>();
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const { userRegistrationEmail, scope, environments } = useConfigSelector();
  const [testToOpenTicketPopup, setTestToOpenTicketPopup] = useState<Test>();
  const previousUserRegistrationEmail = usePrevious(userRegistrationEmail);
  useState(false);
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const isRegistrationEnabled = false;
  const isRegistrationRequired =
    isRegistrationEnabled && !userRegistrationEmail;
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>(
    []
  );
  const testsListRef = useRef<HTMLDivElement>(null);
  const scopeSpan = scope?.span ?? null;
  const previousScopeSpan = usePrevious(scopeSpan);
  const { goTo } = useHistory();
  const areAnyFiltersApplied = selectedEnvironments.length > 0;

  const environmentMenuItems: MenuItem[] = (environments ?? []).map(
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
          : (environments ?? []).map((x) => x.id)
    }),
    [selectedEnvironments, environments]
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
            pageNumber: data?.data?.paging.pageNumber ?? 1,
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
      Boolean(
        previousEnvironmentsToSend &&
          previousEnvironmentsToSend !== environmentsToSend
      ) ||
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
      previousUserRegistrationEmail !== userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationInProgress(false);
    }
  }, [
    userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

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

  const handleResetFiltersButtonClick = () => {
    setSelectedEnvironments([]);
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

  const handleSeeAllAssetsClick = () => {
    sendUserActionTrackingEvent(globalEvents.GO_TO_ALL_ASSETS_CLICKED, {
      source: "Tests tab"
    });
    goTo(`/${TAB_IDS.ASSETS}`);
  };

  const renderContent = () => {
    if (isInitialLoading) {
      return <EmptyState preset={"loading"} />;
    }

    if (data?.error) {
      return <EmptyState message={data.error.message} />;
    }

    if (data?.data?.entries.length === 0) {
      if (areAnyFiltersApplied) {
        return (
          <EmptyState
            preset={"noFilteredData"}
            customContent={
              <NewButton
                onClick={handleResetFiltersButtonClick}
                label={"Reset filters"}
              />
            }
          />
        );
      }

      return <EmptyState preset={"noData"} />;
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
                spanContexts={data.data?.spanContexts ?? []}
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
      {scope?.span?.spanCodeObjectId ? (
        <>
          <s.EnvironmentFilterContainer>
            Environment
            <EnvironmentFilter
              items={environmentMenuItems}
              isLoading={isNull(environments)}
              onMenuItemClick={handleEnvironmentMenuItemClick}
            />
          </s.EnvironmentFilterContainer>
          {renderContent()}
          {testToOpenTicketPopup && (
            <s.Overlay onKeyDown={handleOverlayKeyDown} tabIndex={-1}>
              <s.PopupContainer>
                {isRegistrationRequired ? (
                  <RegistrationDialog
                    onSubmit={handleRegistrationSubmit}
                    onClose={handleRegistrationDialogClose}
                    isRegistrationInProgress={isRegistrationInProgress}
                  />
                ) : (
                  <TestTicket
                    test={testToOpenTicketPopup}
                    spanContexts={data?.data?.spanContexts ?? []}
                    onClose={closeJiraTicketPopup}
                  />
                )}
              </s.PopupContainer>
            </s.Overlay>
          )}
        </>
      ) : (
        <EmptyState
          preset={"selectAsset"}
          customContent={
            <NewButton
              buttonType={"primary"}
              onClick={handleSeeAllAssetsClick}
              label={"See all assets"}
            />
          }
        />
      )}
    </s.Container>
  );
};
