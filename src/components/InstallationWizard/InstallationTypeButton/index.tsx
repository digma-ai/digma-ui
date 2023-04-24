import * as s from "./styles";
import { InstallationTypeButtonProps } from "./types";

export const InstallationTypeButton = (props: InstallationTypeButtonProps) => {
  const handleClick = () => {
    props.onClick(props.installationType);
  };

  return (
    <s.InstallationTypeButton onClick={handleClick} disabled={props.disabled}>
      <s.InstallationTypeButtonIconContainer disabled={props.disabled}>
        {props.icon}
      </s.InstallationTypeButtonIconContainer>
      <s.InstallationTypeButtonTextContainer>
        <s.InstallationTypeButtonTitle disabled={props.disabled}>
          {props.title}
        </s.InstallationTypeButtonTitle>
        {props.description}
      </s.InstallationTypeButtonTextContainer>
    </s.InstallationTypeButton>
  );
};
