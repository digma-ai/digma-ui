import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import { Environment } from "../../../common/App/types";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { MenuList } from "../../common/MenuList";
import * as s from "./styles";
import { EnvironmentMenuProps } from "./types";

export const EnvironmentMenu = ({
  environments,
  onMenuItemClick
}: EnvironmentMenuProps) => {
  const environment = useGlobalStore().environment;

  const handleMenuItemClick = (environment: Environment) => {
    onMenuItemClick(environment);
  };

  return (
    <s.EnvironmentMenuPopup height={"140px"}>
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
