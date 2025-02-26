import { useEffect } from "react";
import useDimensions from "react-cool-dimensions";
import type { Environment } from "../../../common/App/types";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { MenuList } from "../../common/MenuList";
import * as s from "./styles";
import type { EnvironmentMenuProps } from "./types";

export const EnvironmentMenu = ({
  selectedEnvironment,
  environments,
  onMenuItemClick
}: EnvironmentMenuProps) => {
  const handleMenuItemClick = (environment: Environment) => {
    onMenuItemClick(environment);
  };
  const { observe, height } = useDimensions();

  useEffect(() => observe(document.body), [observe]);

  return (
    <s.EnvironmentMenuPopup height={`${height * 0.55}px`}>
      <MenuList
        highlightSelected={true}
        showGroupNames={true}
        items={environments.map((x) => ({
          id: x.id,
          label: x.name,
          onClick: () => handleMenuItemClick(x),
          icon: <EnvironmentIcon environment={x} />,
          groupName: "Environments",
          isSelected: x.id === selectedEnvironment?.id
        }))}
      />
    </s.EnvironmentMenuPopup>
  );
};
