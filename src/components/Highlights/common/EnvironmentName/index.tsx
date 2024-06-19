import { GlobeIcon } from "../../../common/icons/16px/GlobeIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { EnvironmentNameProps } from "./types";

export const EnvironmentName = ({
  name,
  criticality
}: EnvironmentNameProps) => (
  <Tooltip title={name}>
    <s.Container>
      <s.IconContainer $criticality={criticality}>
        <GlobeIcon color={"currentColor"} size={16} />
      </s.IconContainer>
      <s.Name>{name}</s.Name>
    </s.Container>
  </Tooltip>
);
