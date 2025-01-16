import { useEffect, useRef, useState } from "react";
import { useGetIssueRecommendationsQuery } from "../../../../../../redux/services/digma";
import { intersperse } from "../../../../../../utils/intersperse";
import { CrossIcon } from "../../../../../common/icons/16px/CrossIcon";
import { LightBulbWithScrewIcon } from "../../../../../common/icons/16px/LightBulbWithScrewIcon";
import { EmptyState } from "../../../../../common/v3/EmptyState";
import { NewIconButton } from "../../../../../common/v3/NewIconButton";
import { Pagination } from "../../../../../common/v3/Pagination";
import { Toggle } from "../../../../../common/v3/Toggle";
import * as s from "./styles";
import type { SuggestionBarProps } from "./types";

export const SuggestionBar = ({ insightId, onClose }: SuggestionBarProps) => {
  const [page, setPage] = useState<number>(0);
  const { data, isFetching, isError } = useGetIssueRecommendationsQuery({
    IssueId: insightId
  });
  const [assetsToggleValue, setAssetsToggleValue] = useState<string>("code");
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const codeSnippetRef = useRef<HTMLDivElement>(null);
  const actionItemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentContainerRef.current?.scrollTo(0, 0);
    codeSnippetRef.current?.scrollTo(0, 0);
    actionItemsContainerRef.current?.scrollTo(0, 0);
    setAssetsToggleValue("code");
  }, [page]);

  const handleAssetsToggleValueChange = (value: string) => {
    setAssetsToggleValue(value);
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  const recommendationsCount = data?.recommendations.length ?? 0;
  const currentRecommendation = data?.recommendations[page] ?? undefined;

  return (
    <s.Container>
      <s.Header>
        <s.TitleContainer>
          <s.TitleIconContainer>
            <LightBulbWithScrewIcon size={16} color={"currentColor"} />
          </s.TitleIconContainer>
          Suggestion
        </s.TitleContainer>
        <NewIconButton
          icon={CrossIcon}
          onClick={handleCloseButtonClick}
          buttonType={"secondaryBorderless"}
        />
      </s.Header>
      {data ? (
        <>
          {recommendationsCount > 0 && (
            <>
              {currentRecommendation && (
                <s.ContentContainer ref={contentContainerRef}>
                  <s.SectionsContainer>
                    <s.Section>
                      <s.SectionTitle>Reasoning</s.SectionTitle>
                      <s.RecommendationTitle>
                        {currentRecommendation.title}
                      </s.RecommendationTitle>
                    </s.Section>
                    <s.Section>
                      <s.SectionTitle>Recommendation</s.SectionTitle>
                      <s.RecommendationDescription>
                        {currentRecommendation.description}
                      </s.RecommendationDescription>
                    </s.Section>
                    <s.Section>
                      <s.SectionTitle>Sources</s.SectionTitle>
                      <s.SourcesContainer>
                        {intersperse(
                          currentRecommendation.sources.map((x) => (
                            <s.SourceLink
                              key={x.url}
                              href={x.url}
                              target={"_blank"}
                              rel={"noopener noreferrer"}
                            >
                              {x.title}
                            </s.SourceLink>
                          )),
                          () => ", "
                        )}
                      </s.SourcesContainer>
                    </s.Section>
                  </s.SectionsContainer>
                  <s.AssetsContainer>
                    <Toggle
                      options={[
                        { label: "Code box", value: "code" },
                        { label: "Action items", value: "actionItems" }
                      ]}
                      onValueChange={handleAssetsToggleValueChange}
                      value={assetsToggleValue}
                    />
                    {assetsToggleValue === "code" && (
                      <s.CodeSnippet
                        ref={codeSnippetRef}
                        text={currentRecommendation.modifiedCode}
                        // TODO: get language from the response
                        language={"sql"}
                      />
                    )}
                    {assetsToggleValue === "actionItems" && (
                      <s.ActionItemsContainer ref={actionItemsContainerRef}>
                        {currentRecommendation.actionItems.map((x, i) => (
                          <s.ActionItem key={i}>{x}</s.ActionItem>
                        ))}
                      </s.ActionItemsContainer>
                    )}
                  </s.AssetsContainer>
                </s.ContentContainer>
              )}
              <s.Footer>
                Showing {page + 1} of {recommendationsCount} suggestions
                <Pagination
                  itemsCount={recommendationsCount}
                  page={page}
                  pageSize={1}
                  onPageChange={setPage}
                />
              </s.Footer>
            </>
          )}
        </>
      ) : isFetching ? (
        <s.LoadingContainer>
          <EmptyState
            icon={
              <s.SpinnerContainer>
                <s.Spinner size={32} />
              </s.SpinnerContainer>
            }
            title={"Generating response"}
            message={
              "Please wait for the response being generated, this may take some time"
            }
          />
        </s.LoadingContainer>
      ) : isError ? (
        <EmptyState title={"Failed to get recommendation"} />
      ) : null}
    </s.Container>
  );
};
