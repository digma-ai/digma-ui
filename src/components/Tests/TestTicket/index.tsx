import { ReactElement, useContext } from "react";
import { isString } from "../../../typeGuards/isString";
import { getDurationString } from "../../../utils/getDurationString";
import { intersperse } from "../../../utils/intersperse";
import { ConfigContext } from "../../common/App/ConfigContext";
import { DigmaSignature } from "../../common/DigmaSignature";
import { JiraTicket } from "../../common/JiraTicket";
import { Attachment } from "../../common/JiraTicket/types";
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
    <div key={"title"}>
      {`"${name}" test failed${
        isString(errorOrFailMessage)
          ? ` with message:\n${errorOrFailMessage}`
          : ""
      }`}
    </div>,
    <div key={"date"}>Last run at: {new Date(runAt).toString()}</div>,
    <div key={"duration"}>Duration: {getDurationString(duration)}</div>,
    relatedSpans.length > 0 ? (
      <div key={"spans"}>{`Related spans:\n${relatedSpans}`}</div>
    ) : null,
    <DigmaSignature key={"digmaSignature"} />
  ].filter(Boolean) as ReactElement[];

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(description, (i: number) => (
        <br key={`separator-${i}`} />
      ))}
    </>
  );

  const attachments: Attachment[] = [
    ...(traceId
      ? [
          {
            url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
            fileName: `trace-${traceId}.json`
          }
        ]
      : [])
  ];

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription()
      }}
      attachments={attachments}
      onClose={props.onClose}
      tracking={{ prefix: "tests" }}
    />
  );
};
