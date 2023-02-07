import { IconButton } from "../common/IconButton";
import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { ListIcon } from "../common/icons/ListIcon";
import { TableIcon } from "../common/icons/TableIcon";
import { EnvironmentTab } from "../EnvironmentTab";
import * as s from "./styles";
import { EnvironmentPanelProps } from "./types";

export const EnvironmentPanel = (props: EnvironmentPanelProps) => {
  const handleEnvironmentTabClick = (name: string) => {
    props.onEnvSelect(name);
  };

  const icons = {
    list: ListIcon,
    table: TableIcon
  };

  const handleViewModeButtonClick = () => {
    const mode = props.viewMode === "table" ? "list" : "table";
    props.onViewModeChange(mode);
  };

  return (
    <s.BorderContainer>
      <s.Container>
        <s.LogoRotationContainer>
          <s.LogoContainer>
            <DigmaLogoFlatIcon size={22} />
          </s.LogoContainer>
        </s.LogoRotationContainer>
        {props.envs.map((env) => (
          <EnvironmentTab
            key={env.name}
            text={env.name}
            hasBadge={env.hasBadge}
            isSelected={props.selectedEnv === env.name}
            onClick={handleEnvironmentTabClick}
          />
        ))}
        <s.ViewModeButtonContainer>
          <IconButton
            icon={icons[props.viewMode]}
            onClick={handleViewModeButtonClick}
          />
        </s.ViewModeButtonContainer>
      </s.Container>
    </s.BorderContainer>
  );
};
