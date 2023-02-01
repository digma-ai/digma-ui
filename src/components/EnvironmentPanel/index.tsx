import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { EnvironmentTab } from "../EnvironmentTab";
import * as s from "./styles";

interface EnvironmentPanelProps {
  envs: { name: string; hasBadge: boolean }[];
  selectedEnv: string;
  onEnvSelect: (tabId: string) => void;
}

export const EnvironmentPanel = (props: EnvironmentPanelProps) => {
  const handleEnvironmentTabClick = (name: string) => {
    props.onEnvSelect(name);
  };

  return (
    <s.Container>
      <s.LogoContainer>
        <DigmaLogoFlatIcon size={22} />
      </s.LogoContainer>
      {props.envs.map((env) => (
        <EnvironmentTab
          key={env.name}
          text={env.name}
          hasBadge={env.hasBadge}
          isSelected={props.selectedEnv === env.name}
          onClick={handleEnvironmentTabClick}
        />
      ))}
    </s.Container>
  );
};
