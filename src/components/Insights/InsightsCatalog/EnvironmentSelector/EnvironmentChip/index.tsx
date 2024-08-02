import { EnvironmentIcon } from "../../../../common/EnvironmentIcon";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { getMostCriticalIssueCount } from "../getMostCriticalIssueCount";
import * as s from "./styles";
import { EnvironmentChipProps } from "./types";

export const EnvironmentChip = ({
  environment,
  issueCounts,
  onClick,
  isActive
}: EnvironmentChipProps) => {
  const handleClick = () => {
    if (!isActive) {
      onClick(environment.id);
    }
  };

  const environmentName = environment.name;
  const count = getMostCriticalIssueCount(issueCounts);

  return (
    <Tooltip title={environmentName}>
      <s.StyledChip $isActive={isActive} onClick={handleClick}>
        <s.IconContainer>
          <EnvironmentIcon size={16} environment={environment} />
        </s.IconContainer>
        <s.Name>{environmentName}</s.Name>
        {count && (
          <s.Counter $criticality={count.criticality}>{count.count}</s.Counter>
        )}
      </s.StyledChip>
    </Tooltip>
  );
};
