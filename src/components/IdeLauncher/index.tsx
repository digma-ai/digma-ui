import { Outlet } from "react-router";
import { GenericPageLayout } from "../common/GenericPageLayout";
import {
  Subtitle,
  TextContainer,
  Title
} from "../common/GenericPageLayout/styles";

export const IdeLauncher = () => {
  const isMobile = ["Android", "iPhone", "iPad"].some((x) =>
    window.navigator.userAgent.includes(x)
  );

  const renderContent = () => {
    if (isMobile) {
      return (
        <TextContainer>
          <Title>Can&apos;t open Digma link</Title>
          <Subtitle>Digma links can only be opened on desktop/laptop</Subtitle>
        </TextContainer>
      );
    }

    return <Outlet />;
  };

  return (
    <GenericPageLayout title={"Digma IDE Plugin Launcher"}>
      {renderContent()}
    </GenericPageLayout>
  );
};
