import { InsightCard } from "../InsightCard";
import * as s from "./styles";
import { ErrorsInsightProps } from "./types";

export const ErrorsInsight = (props: ErrorsInsightProps) => (
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
              <s.EntityName>{error.errorType}</s.EntityName> from{" "}
              <s.EntityName>
                {error.sourceCodeObjectId.split("$_$")[1]}
              </s.EntityName>
            </s.Description>
          ))}
        </s.ErrorList>
      </s.ContentContainer>
    }
  />
);
