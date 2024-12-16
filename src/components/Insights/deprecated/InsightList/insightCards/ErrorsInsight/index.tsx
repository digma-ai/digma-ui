import { formatUnit } from "../../../../../../utils/formatUnit";
import { Button } from "../../../../../common/Button";
import { Description, Link } from "../../../../styles";
import { InsightCard } from "../../InsightCard";
import * as s from "./styles";
import type { ErrorsInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after the implementation of the version with new UI
 */
export const ErrorsInsight = ({
  onErrorSelect,
  onExpandButtonClick,
  insight,
  onRecalculate,
  onRefresh
}: ErrorsInsightProps) => {
  const handleErrorLinkClick = (errorId: string) => {
    onErrorSelect(errorId, insight.type);
  };

  const handleExpandButtonClick = () => {
    onExpandButtonClick();
  };

  return (
    <InsightCard
      data={insight}
      content={
        <s.ContentContainer>
          <Description>
            {insight.errorCount} {formatUnit(insight.errorCount, "Error")}
          </Description>
          <span>
            {insight.unhandledCount} unhandled, {insight.unexpectedCount}{" "}
            unexpected
          </span>
          <s.ErrorList>
            {insight.topErrors.map((error) => (
              <Description key={error.uid}>
                <s.Error>
                  <Link onClick={() => handleErrorLinkClick(error.uid)}>
                    {error.errorType}
                  </Link>
                </s.Error>{" "}
                from{" "}
                <s.Source>{error.sourceCodeObjectId.split("$_$")[1]}</s.Source>
              </Description>
            ))}
          </s.ErrorList>
        </s.ContentContainer>
      }
      buttons={[
        <Button key={"expand"} onClick={handleExpandButtonClick}>
          Expand
        </Button>
      ]}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
