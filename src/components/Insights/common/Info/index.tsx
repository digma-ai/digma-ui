import { InfoCircleIcon } from "../../../common/icons/InfoCircleIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";

export const Info = (props: { text: string; name: string }) => (
  <Tooltip title={props.text}>
    <s.InfoContainer>
      <div>{props.name}</div>
      <InfoCircleIcon color={"currentColor"} size={12} />
    </s.InfoContainer>
  </Tooltip>
);
