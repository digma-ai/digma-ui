import { ReactElement, useContext } from "react";
import { isString } from "../../../typeGuards/isString";
import { getDurationString } from "../../../utils/getDurationString";
import { intersperse } from "../../../utils/intersperse";
import { DigmaSignature } from "../../Insights/tickets/common/DigmaSignature";
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

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key={"title"}>
            {`"${name}" test failed${
              isString(errorOrFailMessage)
                ? ` with message:\n${errorOrFailMessage}`
                : ""
            }`}
          </div>,
          <div key={"date"}>Last run at: {new Date(runAt).toString()}</div>,
          <div key={"duration"}>Duration: {getDurationString(duration)}</div>,
          <>
            {relatedSpans.length > 0 && (
              <div key={"spans"}>{`Related spans:\n${relatedSpans}`}</div>
            )}
          </>,
          <DigmaSignature key={"digmaSignature"} />
        ],
        (i: number) => (
          <br key={`separator-${i}`} />
        )
      )}
    </>
  );

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
        content: renderDescription()
      }}
      attachment={attachment}
      onClose={props.onClose}
      tracking={{ prefix: "tests" }}
    />
  );
};
