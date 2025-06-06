import {
  useGetAboutQuery,
  useGetEnvironmentsQuery,
  useGetInsightsQuery
} from "../../../../../../redux/services/digma";
import {
  InsightsSortingCriterion,
  SortingOrder
} from "../../../../../../redux/services/types";
import { useInsightsSelector } from "../../../../../../store/insights/useInsightsSelector";
import * as s from "./styles";
import type { AnalyticsProps } from "./types";

const PAGE_SIZE = 10;

export const Analytics = ({
  query,
  onScopeChange,
  onGoToTab
}: AnalyticsProps) => {
  const { page } = useInsightsSelector();
  // const [page, setPage] = useState(0);
  // const insightsListRef = useRef<HTMLDivElement>(null);
  const { data: about } = useGetAboutQuery();
  const { data: environments } = useGetEnvironmentsQuery();
  // const pageSize = query?.pageSize ?? PAGE_SIZE;
  const { data, isFetching, refetch } = useGetInsightsQuery({
    data: {
      environment: query?.environment,
      scopedSpanCodeObjectId: query?.scopedSpanCodeObjectId,
      services:
        query?.services && query?.services.length > 0
          ? query?.services.join(",")
          : undefined,
      sortBy: InsightsSortingCriterion.Criticality,
      sortOrder: SortingOrder.Desc,
      page,
      pageSize: PAGE_SIZE
    },
    extra: {
      insightViewType: "Analytics"
    }
  });

  const handleRefresh = () => {
    void refetch();
  };

  // const handleChangePage = (page: number) => {
  //   sendUserActionTrackingEvent(trackingEvents.ANALYTICS_PAGE_CHANGED);
  //   setPage(page);
  // };

  // const handleScopeChange = (payload: ChangeScopePayload) => {
  //   onScopeChange(payload);
  // };

  // const totalCount = data?.data.totalCount ?? 0;
  // const pageStartItemNumber = page * pageSize + 1;
  // const pageEndItemNumber = Math.min(
  //   pageStartItemNumber + pageSize - 1,
  //   totalCount
  // );

  // useEffect(() => {
  //   setPage(0);
  // }, [query]);

  // useEffect(() => {
  //   insightsListRef.current?.scrollTo(0, 0);
  // }, [page, query]);

  // const renderEmptyState = () => {
  //   const handleSeeAllAssetsClick = () => {
  //     sendUserActionTrackingEvent(
  //       trackingEvents.ANALYTICS_SEE_ALL_ASSETS_BUTTON_CLICKED
  //     );
  //     onGoToAssets();
  //   };

  //   if (!query?.scopedSpanCodeObjectId) {
  //     return (
  //       <InsightsPageEmptyState
  //         preset={"analyticsSelectAsset"}
  //         customContent={
  //           <NewButton
  //             buttonType={"primary"}
  //             onClick={handleSeeAllAssetsClick}
  //             label={"See all assets"}
  //           />
  //         }
  //       />
  //     );
  //   }

  //   return <InsightsPageEmptyState preset={"noDataYet"} />;
  // };

  // return (
  //   <s.Container>
  //     <s.ContentContainer>
  //       {isFetching ? (
  //         <EmptyState preset={"loading"} />
  //       ) : data ? (
  //         data.data.insights.length > 0 ? (
  //           <s.InsightsList ref={insightsListRef}>
  //             {data.data.insights.map((insight) => (
  //               <InsightCardRenderer
  //                 key={insight.id}
  //                 insight={insight}
  //                 isJiraHintEnabled={false}
  //                 isMarkAsReadButtonEnabled={false}
  //                 viewMode={"full"}
  //                 tooltipBoundaryRef={insightsListRef}
  //                 backendInfo={about ?? null}
  //                 onScopeChange={handleScopeChange}
  //               />
  //             ))}
  //           </s.InsightsList>
  //         ) : (
  //           renderEmptyState()
  //         )
  //       ) : null}
  //     </s.ContentContainer>
  //     <s.Footer>
  //       {totalCount > 0 && (
  //         <>
  //           <Pagination
  //             itemsCount={totalCount}
  //             page={page}
  //             pageSize={pageSize}
  //             onPageChange={handleChangePage}
  //             extendedNavigation={true}
  //           />
  //           <s.FooterItemsCount>
  //             Showing{" "}
  //             <s.FooterPageItemsCount>
  //               {pageStartItemNumber} - {pageEndItemNumber}
  //             </s.FooterPageItemsCount>{" "}
  //             of {totalCount}
  //           </s.FooterItemsCount>
  //         </>
  //       )}
  //     </s.Footer>
  //   </s.Container>
  // );

  return (
    <s.Content
      insightViewType={"Analytics"}
      data={data?.data ?? null}
      isLoading={isFetching}
      onScopeChange={onScopeChange}
      onGoToTab={onGoToTab}
      backendInfo={about ?? null}
      onRefresh={handleRefresh}
      environments={environments}
    />
  );
};
