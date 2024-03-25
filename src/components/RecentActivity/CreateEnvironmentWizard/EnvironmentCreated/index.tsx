import { useTheme } from "styled-components";
import { CheckCircleIcon } from "../../../common/icons/20px/CheckCircleIcon";
import { Button } from "../../../common/v3/Button";
import * as s from "./styles";
import { EnvironmentCreatedProps } from "./types";

export const EnvironmentCreated = ({
  goToEnvironment
}: EnvironmentCreatedProps) => {
  const theme = useTheme();
  return (
    <s.Container>
      <CheckCircleIcon size={20} color={theme.colors.v3.status.success} />
      <s.Info>
        <s.Title>Environment Created</s.Title>
        <s.Description>
          Your private environment is successfully created. Next - setup your
          environment.
        </s.Description>
      </s.Info>
      <Button
        buttonType="primary"
        label="Open Environment"
        onClick={goToEnvironment}
      />
    </s.Container>
  );
};
