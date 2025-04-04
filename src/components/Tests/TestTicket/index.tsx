import type { ReactElement } from "react";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isString } from "../../../typeGuards/isString";
import { getDurationString } from "../../../utils/getDurationString";
import { intersperse } from "../../../utils/intersperse";
import { DigmaSignature } from "../../common/DigmaSignature";
import { JiraTicket } from "../../common/JiraTicket";
import type { Attachment } from "../../common/JiraTicket/types";
import { getTraceAttachment } from "../../Insights/InsightTicketRenderer/insightTickets/common/getTraceAttachment";
import type { TestTicketProps } from "./types";

export const TestTicket = ({
  test,
  spanContexts,
  onClose
}: TestTicketProps) => {
  const {
    traceId,
    name,
    errorOrFailMessage,
    runAt,
    duration,
    contextsSpanCodeObjectIds
  } = test;
  const summary = `"${name}" test failed`;
  const { jaegerApiPath } = useConfigSelector();

  const relatedSpans = spanContexts
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

  const traceAttachment = getTraceAttachment(
    `${window.location.origin}${jaegerApiPath ?? ""}`,
    traceId
  );
  const attachments: Attachment[] = [
    ...(traceAttachment ? [traceAttachment] : [])
  ];

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription()
      }}
      attachments={attachments}
      onClose={onClose}
      tracking={{ prefix: "tests" }}
    />
  );
};
