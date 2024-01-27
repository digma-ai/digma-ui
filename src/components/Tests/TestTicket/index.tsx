import { useContext } from "react";
import { isString } from "../../../typeGuards/isString";
import { getDurationString } from "../../../utils/getDurationString";
import { ConfigContext } from "../../common/App/ConfigContext";
import { JiraTicket } from "../../common/JiraTicket";
import { TestTicketProps } from "./types";

export const TestTicket = (props: TestTicketProps) => {
  const {
    traceId,
    name,
    errorOrFailMessage,
    runAt,
    duration,
    contextsSpanCodeObjectIds
  } = props.test;
  const summary = `"${name}" test failed`;
  const config = useContext(ConfigContext);

  const relatedSpans = props.spanContexts
    .filter((x) => contextsSpanCodeObjectIds.includes(x.spanCodeObjectId))
    .map((x) => x.displayName)
    .join("\n");

  const description = [
    `"${name}" test failed${
      isString(errorOrFailMessage)
        ? ` with message:\n${errorOrFailMessage}`
        : ""
    }`,
    `Last run at: ${new Date(runAt).toString()}`,
    `Duration: ${getDurationString(duration)}`,
    relatedSpans.length > 0 ? `Related spans:\n${relatedSpans}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");

  const attachment = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: description
      }}
      attachment={attachment}
      onClose={props.onClose}
      tracking={{ prefix: "tests" }}
    />
  );
};
