import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useGetIssuesQuery } from "../../../../../redux/services/digma";
import { isUndefined } from "../../../../../typeGuards/isUndefined";
import type { Scope } from "../../../../common/App/types";
import { CrossIcon } from "../../../../common/icons/16px/CrossIcon";
import { EyeIcon } from "../../../../common/icons/16px/EyeIcon";
import { Pagination } from "../../../../common/Pagination";
import { NewButton } from "../../../../common/v3/NewButton";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { actions } from "../../../../Insights/actions";
import { EmptyState } from "../../../../Insights/EmptyState";
import { EmptyState as InsightsPageEmptyState } from "../../../../Insights/InsightsCatalog/InsightsPage/EmptyState";
import { InsightCardRenderer } from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer";
import { ViewMode } from "../../../../Insights/InsightsCatalog/types";
import { InsightTicketRenderer } from "../../../../Insights/InsightTicketRenderer";
import type {
  GenericCodeObjectInsight,
  InsightTicketInfo
} from "../../../../Insights/types";
import { ScopeBar } from "../../../../Navigation/ScopeBar";
import * as s from "./styles";
import type { IssuesHeaderProps } from "./types";

const PAGE_SIZE = 10;

export const IssuesSidebar = ({
  onClose,
  scope,
  environmentId,
  viewLevel
}: IssuesHeaderProps) => {
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.All);
  const [page, setPage] = useState(0);

  const theme = useTheme();
  const { data, isFetching, refetch } = useGetIssuesQuery(
    {
      environment: environmentId,
      scopedSpanCodeObjectId:
        viewLevel === "endpoints" && scope ? scope.value : undefined,
      showDismissed: viewMode === ViewMode.OnlyDismissed,
      services: viewLevel === "services" && scope ? [scope.value] : undefined,
      sortBy: "criticalinsights",
      sortOrder: "desc",
      page,
      pageSize: PAGE_SIZE
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (infoToOpenJiraTicket) {
          handleJiraTicketPopupClose();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [infoToOpenJiraTicket, onClose]);

  const refresh = () => {
    void refetch();
  };

  const handleDismissalChange = (action: string, insightId: string) => {
    if (
      action === actions.UNDISMISS &&
      data?.insights.length === 1 &&
      data.insights[0].id === insightId
    ) {
      setViewMode(ViewMode.All);
    }
    refresh();
  };

  const handleSidebarCloseButtonClick = () => {
    onClose();
  };

  const handleDismissalViewModeButtonClick = () => {
    const newMode =
      viewMode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
    setViewMode(newMode);
  };

  const handleJiraTicketPopupOpen = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => {
    setInfoToOpenJiraTicket({ insight, spanCodeObjectId });
  };

  const handleJiraTicketPopupClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const dismissedCount = data?.dismissedCount;
  const totalCount = data?.totalCount ?? 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );
  const isDismissalViewModeButtonVisible =
    data && (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter

  const extendedScope: Scope = {
    span: {
      displayName: scope?.displayName ?? scope?.value ?? "",
      spanCodeObjectId: scope?.value ?? "",
      methodId: null,
      serviceName: null,
      role: null
    },
    code: {
      relatedCodeDetailsList: [],
      codeDetailsList: []
    },
    hasErrors: false,
    issuesInsightsCount: 0,
    analyticsInsightsCount: 0,
    unreadInsightsCount: 0
  };

  return (
    <s.Container>
      <s.Header>
        <s.HeaderTitleRow>
          <span>Issues</span>
          <NewIconButton
            buttonType={"secondaryBorderless"}
            icon={CrossIcon}
            onClick={handleSidebarCloseButtonClick}
          />
        </s.HeaderTitleRow>
        <ScopeBar
          isExpanded={false}
          isSpanInfoEnabled={false}
          linkedEndpoints={[]}
          scope={extendedScope}
          isTargetButtonMenuVisible={false}
        />
      </s.Header>
      {data ? (
        data.insights.length > 0 ? (
          <s.IssuesList>
            {environmentId &&
              data.insights.map((insight) => (
                <InsightCardRenderer
                  key={insight.id}
                  insight={insight}
                  onJiraTicketCreate={handleJiraTicketPopupOpen}
                  isJiraHintEnabled={false}
                  onRefresh={refresh}
                  isMarkAsReadButtonEnabled={false}
                  viewMode={"full"}
                  environmentId={environmentId}
                  onDismissalChange={handleDismissalChange}
                />
              ))}
          </s.IssuesList>
        ) : (
          <InsightsPageEmptyState
            preset={viewMode === ViewMode.All ? "noDataYet" : "noDismissedData"}
          />
        )
      ) : (
        isFetching && <EmptyState preset={"loading"} />
      )}
      <s.Footer>
        {totalCount > 0 && (
          <>
            <Pagination
              itemsCount={totalCount}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              extendedNavigation={true}
            />
            <s.FooterItemsCount>
              Showing{" "}
              <s.FooterPageItemsCount>
                {pageStartItemNumber} - {pageEndItemNumber}
              </s.FooterPageItemsCount>{" "}
              of {totalCount}
            </s.FooterItemsCount>
          </>
        )}
        {isDismissalViewModeButtonVisible && (
          <NewButton
            buttonType={"secondaryBorderless"}
            icon={(props) => (
              <EyeIcon
                {...props}
                crossOut={viewMode !== ViewMode.OnlyDismissed}
                color={
                  viewMode === ViewMode.OnlyDismissed
                    ? theme.colors.v3.icon.brandSecondary
                    : props.color
                }
              />
            )}
            onClick={handleDismissalViewModeButtonClick}
          />
        )}
      </s.Footer>
      {infoToOpenJiraTicket && (
        <s.Overlay>
          <s.PopupContainer>
            <InsightTicketRenderer
              data={infoToOpenJiraTicket}
              refreshInsights={refresh}
              onClose={handleJiraTicketPopupClose}
              environmentId={environmentId}
            />
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
