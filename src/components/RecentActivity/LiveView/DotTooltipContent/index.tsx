import { format } from "date-fns";
import { TooltipContent } from "../TooltipContent";
import * as s from "./styles";
import { DotTooltipContentProps } from "./types";

export const DotTooltipContent = (
  props: DotTooltipContentProps
): JSX.Element => {
  const date = new Date(props.data.dateTime);

  return (
    <TooltipContent>
      <s.Container>
        <s.Timestamp>
          {format(date, "HH:mm:ss.SSS")}
          <s.Divider />
          {format(date, "MM/dd/yyyy")}
        </s.Timestamp>
        {props.data.duration.value} {props.data.duration.unit}
      </s.Container>
    </TooltipContent>
  );
};
