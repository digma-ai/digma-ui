import { InfoCircleIcon } from "../../icons/InfoCircleIcon";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { InfoProps } from "./types";

export const Info = ({ title }: InfoProps) => (
  <Tooltip title={title}>
    <s.Container>
      <InfoCircleIcon color={"currentColor"} size={12} />
    </s.Container>
  </Tooltip>
);
