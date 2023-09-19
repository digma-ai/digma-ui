import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { Button } from "../../common/Button";
import { TextField } from "../../common/TextField";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { ExtendedEnvironment } from "../types";
import * as s from "./styles";
import { AddEnvironmentDialogProps } from "./types";

const validateName = (
  value: string,
  environments: ExtendedEnvironment[]
): { isValid: boolean; errorMessage?: ReactNode } => {
  const ENVIRONMENT_NAME_REGEX = /^[A-Z0-9_.-]{1,50}$/;
  const ENVIRONMENT_NAME_MESSAGE =
    "Name must contain only Latin letters (A-Z), digits (0-9), hyphen (-), underscore (_) and dot(.) and must be at most 50 characters long";
  const ENVIRONMENT_EXISTS_MESSAGE =
    "Environment with such name already exists";

  if (!ENVIRONMENT_NAME_REGEX.test(value)) {
    return {
      isValid: false,
      errorMessage: <>{ENVIRONMENT_NAME_MESSAGE}</>
    };
  }

  if (environments.find((x) => x.name === value || x.originalName === value)) {
    return {
      isValid: false,
      errorMessage: (
        <s.ErrorMessage>
          <WarningCircleLargeIcon color={"currentColor"} />
          {ENVIRONMENT_EXISTS_MESSAGE}
        </s.ErrorMessage>
      )
    };
  }

  return {
    isValid: true
  };
};

const getCloseButtonIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#818594";
    case "dark":
    case "dark-jetbrains":
      return "#b4b8bf";
  }
};

export const AddEnvironmentDialog = (props: AddEnvironmentDialogProps) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const theme = useTheme();
  const closeButtonIconColor = getCloseButtonIconColor(theme);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isEnvironmentNameValid, setIsEnvironmentNameValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ReactNode>();

  useEffect(() => {
    textFieldRef.current?.focus();
  }, []);

  const handleTextFieldValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleUpperCase();
    setTextFieldValue(value);

    const { isValid, errorMessage } = validateName(value, props.environments);
    setIsEnvironmentNameValid(isValid);
    setErrorMessage(errorMessage);
  };

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleCancelButtonClick = () => {
    props.onClose();
  };

  const handleNextButtonClick = () => {
    props.onEnvironmentAdd(textFieldValue);
    props.onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isEnvironmentNameValid) {
      props.onEnvironmentAdd(textFieldValue);
      props.onClose();
    }
  };

  return (
    <s.Container onKeyDown={handleKeyDown}>
      <s.Header>
        Add Environment
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={closeButtonIconColor} size={14} />
        </s.CloseButton>
      </s.Header>
      <TextField
        ref={textFieldRef}
        onChange={handleTextFieldValueChange}
        value={textFieldValue}
      />
      {textFieldValue.length > 0 && errorMessage && <span>{errorMessage}</span>}
      <s.ButtonsContainer>
        <Button buttonType={"secondary"} onClick={handleCancelButtonClick}>
          Cancel
        </Button>
        <Button
          disabled={!isEnvironmentNameValid}
          onClick={handleNextButtonClick}
        >
          Next
        </Button>
      </s.ButtonsContainer>
    </s.Container>
  );
};
