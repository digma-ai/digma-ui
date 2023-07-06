import styled from "styled-components";
import { Button } from "../../common/Button";
import { SectionTitle as CommonSectionTitle } from "../SectionTitle";
import { Tabs } from "../Tabs";
import { Link, SectionDescription } from "../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
`;

export const SectionTitle = styled(CommonSectionTitle)`
  gap: 2px;
  margin-bottom: 2px;
`;

export const DockerComposeTabs = styled(Tabs)`
  margin-top: 21px;
`;

export const GetDockerExtensionButton = styled(Button)`
  margin-top: 12px;
`;

export const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
`;

export const DockerComposeOSTabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LoaderContainer = styled.div`
  padding: 80px 0 16px;
  height: 172px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  box-sizing: border-box;
`;

export const CommonContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

export const IconBackgroundCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#d0d6eb";
      case "dark":
      case "dark-jetbrains":
        return "#323334";
    }
  }};
`;

export const NoDockerTabContentContainer = styled(TabContentContainer)`
  align-items: center;
  gap: 8px;
  padding: 79px 21px 0;
`;

export const NoDockerText = styled(SectionDescription)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
`;

export const SlackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
