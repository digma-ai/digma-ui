import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { isNull } from "../../../../typeGuards/isNull";
import { CheckmarkCircleIcon } from "../../../common/icons/12px/CheckmarkCircleIcon";
import { ErrorIcon } from "../../../common/icons/12px/ErrorIcon";
import { Button } from "../../../common/v3/Button";
import * as s from "./styles";
import type { EnvironmentNameStepProps } from "./types";

const ENVIRONMENT_NAME_REGEX = /^[A-Z0-9_.-]{1,50}$/;

export const EnvironmentNameStep = ({
  onNameChange,
  onNext,
  isInvalid
}: EnvironmentNameStepProps) => {
  const [name, setName] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(!isInvalid);

  useEffect(() => {
    setIsValid(!isInvalid);
  }, [isInvalid]);

  const handleNext = () => {
    onNext(false);
  };

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
    if (isNull(name)) {
      return <></>;
    }

    return isValid ? (
      <s.CheckMarkIconContainer>
        <CheckmarkCircleIcon color={"currentColor"} />
      </s.CheckMarkIconContainer>
    ) : (
      <s.ErrorIconContainer>
        <ErrorIcon color={"currentColor"} />
      </s.ErrorIconContainer>
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
          isInvalid={!isValid}
        />
        <Button
          buttonType={"primary"}
          onClick={handleNext}
          isDisabled={!isValid || isNull(name)}
          label={"Next"}
        />
      </s.InputContainer>
    </s.Container>
  );
};
