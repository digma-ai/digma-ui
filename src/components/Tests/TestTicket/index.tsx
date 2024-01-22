import { isString } from "../../../typeGuards/isString";
import { getDurationString } from "../../../utils/getDurationString";
import { JiraTicket } from "../../common/JiraTicket";
import { TestTicketProps } from "./types";

export const TestTicket = (props: TestTicketProps) => {
  const summary = `"${props.test.name}" test failed`;

  const relatedSpans = props.spanContexts
    .filter((x) =>
      props.test.contextsSpanCodeObjectIds.includes(x.spanCodeObjectId)
    )
    .map((x) => x.displayName)
    .join("\n");

  const description = [
    `"${props.test.name}" test failed${
      isString(props.test.errorOrFailMessage)
        ? ` with message:\n${props.test.errorOrFailMessage}`
        : ""
    }`,
    `Last run at: ${new Date(props.test.runAt).toString()}`,
    `Duration: ${getDurationString(props.test.duration)}`,
    relatedSpans.length > 0 ? `Related spans:\n${relatedSpans}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: description
      }}
      onClose={props.onClose}
      tracking={{ prefix: "tests" }}
    />
  );
};
