import { EnvironmentIcon } from "../../../../common/EnvironmentIcon";
import { Tooltip } from "../../../../common/v3/Tooltip";
import * as s from "./styles";
import { EnvironmentChipProps } from "./types";

export const EnvironmentChip = ({
  environment,
  onClick,
  isActive
}: EnvironmentChipProps) => {
  const handleClick = () => {
    if (!isActive) {
      onClick(environment.id);
    }
  };

  const environmentName = environment.name;

  return (
    <Tooltip title={environmentName}>
      <s.StyledChip isActive={isActive} onClick={handleClick}>
        <s.IconContainer>
          <EnvironmentIcon size={16} environment={environment} />
        </s.IconContainer>
        <s.Name>{environmentName}</s.Name>
      </s.StyledChip>
    </Tooltip>
  );
};
