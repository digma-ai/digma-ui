import { Button } from "../../common/Button";
import { InsightCard } from "../InsightCard";
import { Link } from "../styles";
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
          <s.Description>
            {props.insight.errorCount} Error
            {props.insight.errorCount === 1 ? "" : "s"}
          </s.Description>
          <s.EntityName>
            {props.insight.unhandledCount} unhandled,{" "}
            {props.insight.unexpectedCount} unexpected
          </s.EntityName>
          <s.ErrorList>
            {props.insight.topErrors.map((error) => (
              <s.Description key={error.uid}>
                <Link onClick={() => handleErrorLinkClick(error.uid)}>
                  {error.errorType}
                </Link>{" "}
                from{" "}
                <s.EntityName>
                  {error.sourceCodeObjectId.split("$_$")[1]}
                </s.EntityName>
              </s.Description>
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
    />
  );
};
