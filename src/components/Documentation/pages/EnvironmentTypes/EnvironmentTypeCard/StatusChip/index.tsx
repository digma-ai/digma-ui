import { Badge } from "../../../../../common/Badge";
import { EnvironmentStatus } from "../types";
import * as s from "./styles";
import { StatusChipProps } from "./types";

const getBadgeStyles = (status: EnvironmentStatus) => {
  switch (status) {
    case "waiting-for-data":
      return {
        main: {
          background: "#fff"
        },
        outline: {
          background: "rgb(147 149 228 / 40%)"
        }
      };
    case "active":
    default:
      return undefined;
  }
};

const getLabel = (status: EnvironmentStatus): string => {
  switch (status) {
    case "active":
      return "Active";
    case "waiting-for-data":
      return "Waiting for data";
  }
};

export const StatusChip = (props: StatusChipProps) => {
  return (
    <s.Container $status={props.status}>
      <Badge customStyles={getBadgeStyles(props.status)} />
      {getLabel(props.status)}
    </s.Container>
  );
};
