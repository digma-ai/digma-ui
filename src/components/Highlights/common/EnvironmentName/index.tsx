import { useTheme } from "styled-components";
import { formatEnvironmentName } from "../../../../utils/formatEnvironmentName";
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
  const formattedName = formatEnvironmentName(name);

  return (
    <Tooltip title={formattedName}>
      <s.Container>
        <s.IconContainer>
          <GlobeIcon color={iconColor || "currentColor"} size={16} />
        </s.IconContainer>
        <s.Name>{formattedName}</s.Name>
      </s.Container>
    </Tooltip>
  );
};
