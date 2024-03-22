import { ChangeEvent, useState } from "react";
import { useTheme } from "styled-components";
import { CheckCircleIcon } from "../../../common/icons/12px/CheckCircleIcon";
import { ErrorIcon } from "../../../common/icons/12px/ErrorIcon";
import { Button } from "../../../common/v3/Button";
import * as s from "./styles";
import { EnvironmentNameStepProps } from "./types";

const ENVIRONMENT_NAME_REGEX = /^[A-Z0-9_.-]{1,50}$/;

export const EnvironmentNameStep = ({
  onNameChange,
  onNext
}: EnvironmentNameStepProps) => {
  const theme = useTheme();
  const [name, setName] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setName(value);

    if (!ENVIRONMENT_NAME_REGEX.test(value)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    onNameChange(value);
  };

  const getInputState = () => {
    if (name === null) {
      return <></>;
    }

    return isValid ? (
      <CheckCircleIcon color={theme.colors.v3.status.success} />
    ) : (
      <ErrorIcon color={theme.colors.v3.status.high} />
    );
  };

  return (
    <s.Container>
      <s.Info>
        <s.Title>Name your Environment</s.Title>
        <s.Description>
          Name must contain only Latin letters (A-Z), digits (0-9), hyphen (-),
          underscore (_) and dot(.) and must be at most 50 characters long
        </s.Description>
      </s.Info>
      <s.InputContainer>
        <s.NameInput
          onChange={changeHandler}
          inputEndContent={getInputState()}
          $isValid={isValid}
        />
        <Button
          buttonType="primary"
          onClick={onNext}
          isDisabled={!isValid}
          label="Next"
        />
      </s.InputContainer>
    </s.Container>
  );
};
