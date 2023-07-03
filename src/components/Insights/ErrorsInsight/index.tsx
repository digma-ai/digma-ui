import { Button } from "../../common/Button";
import { InsightCard } from "../InsightCard";
import { Link } from "../styles";
import * as s from "./styles";
import { ErrorsInsightProps } from "./types";

export const ErrorsInsight = (props: ErrorsInsightProps) => {
  const handleExpandButtonClick = () => {
    // TODO
    console.log("Expand");
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
                <Link>{error.errorType}</Link> from{" "}
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
    />
  );
};
