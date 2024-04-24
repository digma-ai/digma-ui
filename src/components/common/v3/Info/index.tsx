import { InfoCircleIcon } from "../../icons/InfoCircleIcon";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { InfoProps } from "./types";

export const Info = ({ title, className }: InfoProps) => (
  <Tooltip title={title}>
    <s.Container className={className}>
      <InfoCircleIcon color={"currentColor"} size={12} />
    </s.Container>
  </Tooltip>
);
