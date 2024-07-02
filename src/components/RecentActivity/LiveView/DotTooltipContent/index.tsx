import { format } from "date-fns";
import { getDurationString } from "../../../../utils/getDurationString";
import { TooltipContent } from "../TooltipContent";
import * as s from "./styles";
import { DotTooltipContentProps } from "./types";

export const DotTooltipContent = ({
  data
}: DotTooltipContentProps): JSX.Element => {
  const date = new Date(data.dateTime);

  return (
    <TooltipContent>
      <s.Container>
        <s.Timestamp>
          {format(date, "HH:mm:ss.SSS")}
          <s.Divider />
          {format(date, "MM/dd/yyyy")}
        </s.Timestamp>
        {getDurationString(data.duration)}
      </s.Container>
    </TooltipContent>
  );
};
