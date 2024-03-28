import { useTheme } from "styled-components";
import { getInsightCriticalityColor } from "../../../utils/getInsightCriticalityColor";
import { GlobeIcon } from "../../common/icons/16px/GlobeIcon";
import * as s from "./styles";
import { EnvironmentNameProps } from "./types";

export const EnvironmentName = ({ data }: EnvironmentNameProps) => {
  const theme = useTheme();
  const iconColor = getInsightCriticalityColor(data.criticality, theme);

  return (
    <s.Container>
      <GlobeIcon color={iconColor} size={16} />
      {data.environmentName}
    </s.Container>
  );
};
