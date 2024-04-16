import { useTheme } from "styled-components";
import { getInsightCriticalityColor } from "../../../../utils/getInsightCriticalityColor";
import { GlobeIcon } from "../../../common/icons/16px/GlobeIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { EnvironmentNameProps } from "./types";

export const EnvironmentName = ({
  name,
  criticality
}: EnvironmentNameProps) => {
  const theme = useTheme();
  const iconColor = criticality
    ? getInsightCriticalityColor(criticality, theme)
    : undefined;

  return (
    <Tooltip title={name}>
      <s.Container>
        <s.IconContainer>
          <GlobeIcon color={iconColor || "currentColor"} size={16} />
        </s.IconContainer>
        <s.Name>{name}</s.Name>
      </s.Container>
    </Tooltip>
  );
};
