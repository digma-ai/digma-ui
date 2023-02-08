import { IconButton } from "../../common/IconButton";
import { DigmaLogoFlatIcon } from "../../common/icons/DigmaLogoFlatIcon";
import { ListIcon } from "../../common/icons/ListIcon";
import { TableIcon } from "../../common/icons/TableIcon";
import { EnvironmentTab } from "./EnvironmentTab";
import * as s from "./styles";
import { EnvironmentPanelProps } from "./types";

export const EnvironmentPanel = (props: EnvironmentPanelProps) => {
  const handleEnvironmentTabClick = (name: string) => {
    props.onEnvironmentSelect(name);
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
        {props.environments.map((environment) => (
          <EnvironmentTab
            key={environment.name}
            text={environment.name}
            hasBadge={environment.hasBadge}
            isSelected={props.selectedEnvironment === environment.name}
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
