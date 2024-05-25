import { CheckmarkCircleIcon } from "../../../common/icons/20px/CheckmarkCircleIcon";
import { Button } from "../../../common/v3/Button";
import * as s from "./styles";
import { EnvironmentCreatedProps } from "./types";

export const EnvironmentCreated = ({
  goToEnvironment
}: EnvironmentCreatedProps) => {
  return (
    <s.Container>
      <s.CheckMarkIconContainer>
        <CheckmarkCircleIcon size={20} color={"currentColor"} />
      </s.CheckMarkIconContainer>
      <s.Info>
        <s.Title>Environment Created</s.Title>
        <s.Description>
          Your private environment is successfully created. Next - setup your
          environment.
        </s.Description>
      </s.Info>
      <Button
        buttonType={"primary"}
        label={"Open Environment"}
        onClick={goToEnvironment}
      />
    </s.Container>
  );
};
