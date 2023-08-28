import { Button } from "../../common/Button";
import { InsightCard } from "../InsightCard";
import { Description, Link } from "../styles";
import * as s from "./styles";
import { ErrorsInsightProps } from "./types";

export const ErrorsInsight = (props: ErrorsInsightProps) => {
  const handleErrorLinkClick = (errorId: string) => {
    props.onErrorSelect(errorId);
  };

  const handleExpandButtonClick = () => {
    props.onExpandButtonClick();
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <Description>
            {props.insight.errorCount} Error
            {props.insight.errorCount === 1 ? "" : "s"}
          </Description>
          <span>
            {props.insight.unhandledCount} unhandled,{" "}
            {props.insight.unexpectedCount} unexpected
          </span>
          <s.ErrorList>
            {props.insight.topErrors.map((error) => (
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
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
