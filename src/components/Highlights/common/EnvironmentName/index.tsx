import { useTheme } from "styled-components";
import { formatEnvironmentName } from "../../../../utils/formatEnvironmentName";
import { getInsightCriticalityColor } from "../../../../utils/getInsightCriticalityColor";
import { GlobeIcon } from "../../../common/icons/16px/GlobeIcon";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { EnvironmentNameProps } from "./types";

export const EnvironmentName = ({ data }: EnvironmentNameProps) => {
  const theme = useTheme();
  const iconColor = getInsightCriticalityColor(data.criticality, theme);
  const name = formatEnvironmentName(data.environmentName);

  return (
    <Tooltip title={name}>
      <s.Container>
        <s.IconContainer>
          <GlobeIcon color={iconColor} size={16} />
        </s.IconContainer>
        <s.Name>{name}</s.Name>
      </s.Container>
    </Tooltip>
  );
};
