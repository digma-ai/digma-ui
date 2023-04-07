import styled from "styled-components";
import { Button } from "../../common/Button";
import { SectionTitle as CommonSectionTitle } from "../SectionTitle";
import { Tabs } from "../Tabs";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px 12px;
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

export const InstallTabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0 12px;
`;

export const DockerComposeOSTabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0 12px;
`;

export const LoaderContainer = styled.div`
  padding: 80px 0 16px;
  height: 172px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  box-sizing: border-box;
`;
