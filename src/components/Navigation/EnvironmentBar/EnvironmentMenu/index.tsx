import { useEffect } from "react";
import useDimensions from "react-cool-dimensions";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import type { Environment } from "../../../common/App/types";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { MenuList } from "../../common/MenuList";
import * as s from "./styles";
import type { EnvironmentMenuProps } from "./types";

export const EnvironmentMenu = ({
  environments,
  onMenuItemClick
}: EnvironmentMenuProps) => {
  const { environment } = useConfigSelector();

  const handleMenuItemClick = (environment: Environment) => {
    onMenuItemClick(environment);
  };
  const { observe, height } = useDimensions();
  useEffect(() => observe(document.body), []);

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
          isSelected: x.id === environment?.id
        }))}
      />
    </s.EnvironmentMenuPopup>
  );
};
