import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTheme } from "styled-components";
import { useGetIssuesQuery } from "../../../../../redux/services/digma";
import { isUndefined } from "../../../../../typeGuards/isUndefined";
import type { Scope } from "../../../../common/App/types";
import { CrossIcon } from "../../../../common/icons/16px/CrossIcon";
import { EyeIcon } from "../../../../common/icons/16px/EyeIcon";
import { Pagination } from "../../../../common/Pagination";
import { EmptyState } from "../../../../common/v3/EmptyState";
import { NewButton } from "../../../../common/v3/NewButton";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { Spinner } from "../../../../common/v3/Spinner";
import { renderInsightCard } from "../../../../Insights/InsightsCatalog/InsightsPage";
import { ViewMode } from "../../../../Insights/InsightsCatalog/types";
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
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.All);
  const [page, setPage] = useState(0);

  const theme = useTheme();
  const { data, isLoading } = useGetIssuesQuery(
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

  const handleSidebarCloseButtonClick = () => {
    onClose();
  };

  const handleDismissalViewModeButtonClick = () => {
    const newMode =
      viewMode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
    setViewMode(newMode);
  };

  const dismissedCount = data?.dismissedCount;
  const totalCount = data?.totalCount ?? 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );
  const isDismissalViewModeButtonVisible =
    isUndefined(dismissedCount) || dismissedCount > 0; // isUndefined - check for backward compatibility, always show when BE does not return this counter

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
          onExpandCollapseChange={() => {
            // TODO: make optional and remove
            // eslint-disable-next-line no-console
            console.log("onExpandCollapseChange");
          }}
          linkedEndpoints={[]}
          scope={extendedScope}
          isTargetButtonMenuVisible={false}
        />
      </s.Header>
      {data ? (
        <s.IssuesList>
          {data.insights.map((insight) => (
            <Fragment key={insight.id}>
              {renderInsightCard(
                insight,
                () => {
                  // TODO: implement
                  // eslint-disable-next-line no-console
                  console.log("onJiraTicketCreate");
                },
                false,
                () => {
                  // TODO: make optional and remove
                  // eslint-disable-next-line no-console
                  console.log("onRefresh");
                },
                false,
                "full"
              )}
            </Fragment>
          ))}
        </s.IssuesList>
      ) : (
        isLoading && <EmptyState customContent={<Spinner size={50} />} />
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
    </s.Container>
  );
};
