import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { Environment } from "../../../common/App/types";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { MenuList } from "../../common/MenuList";
import * as s from "./styles";
import { EnvironmentMenuProps } from "./types";

export const EnvironmentMenu = ({
  environments,
  onMenuItemClick
}: EnvironmentMenuProps) => {
  const { environment } = useConfigSelector();

  const handleMenuItemClick = (environment: Environment) => {
    onMenuItemClick(environment);
  };
  const { innerHeight } = window;

  return (
    <s.EnvironmentMenuPopup height={innerHeight * 0.55 + "px"}>
      <MenuList
        highlightSelected={true}
        showGroupNames={true}
        items={environments.map((x) => ({
          id: x.id,
          label: x.name,
          onClick: () => handleMenuItemClick(x),
          icon: <EnvironmentIcon environment={x} />,
          groupName: "Environments",
          isSelected: x.id === environment?.id
        }))}
      />
    </s.EnvironmentMenuPopup>
  );
};
