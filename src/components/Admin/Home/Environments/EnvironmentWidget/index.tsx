import { EnvironmentIcon } from "../../../../common/EnvironmentIcon";
import * as s from "./styles";
import type { EnvironmentWidgetProps } from "./types";

export const EnvironmentWidget = ({ environment }: EnvironmentWidgetProps) => (
  <s.Container>
    <s.Header>
      <s.EnvironmentIconContainer>
        <EnvironmentIcon environment={environment} size={16} />
      </s.EnvironmentIconContainer>
      {environment.name}
    </s.Header>
  </s.Container>
);
