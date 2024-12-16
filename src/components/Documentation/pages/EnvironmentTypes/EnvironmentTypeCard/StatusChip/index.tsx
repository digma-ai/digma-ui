import { Badge } from "../../../../../common/Badge";
import type { EnvironmentStatus } from "../types";
import * as s from "./styles";
import type { StatusChipProps } from "./types";

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

export const StatusChip = ({ status }: StatusChipProps) => (
  <s.Container $status={status}>
    <Badge customStyles={getBadgeStyles(status)} />
    {getLabel(status)}
  </s.Container>
);
