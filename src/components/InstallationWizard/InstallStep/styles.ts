import styled, { css } from "styled-components";
import { Button } from "../../common/Button";
import { Link } from "../../common/Link";
import { SectionTitle as CommonSectionTitle } from "../SectionTitle";
import { Tabs } from "../Tabs";
import { SectionDescription } from "../styles";
import { TabContentContainerProps } from "./types";

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

export const TabContentContainer = styled.div<TabContentContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  position: relative;

  ${({ overlay }) => {
    if (overlay) {
      return css`
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${({ theme }) => {
            switch (theme.mode) {
              case "light":
                return "#ebecf0";
              case "dark":
              case "dark-jetbrains":
                return "#393b40";
            }
          }};
          opacity: 0.5;
          pointer-events: none;
        }
      `;
    }
  }};
`;

export const DockerComposeOSTabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// export const LoaderContainer = styled.div`
//   padding: 80px 0 10px;
//   height: 174px;
//   display: flex;
//   justify-content: center;
//   flex-grow: 1;
//   box-sizing: border-box;
// `;

export const EngineManagerContainer = styled.div`
  padding-bottom: 24px;
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
  padding: 79px 21px;
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

export const RunningDigmaMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const RunningDigmaMessageTitle = styled.span`
  text-align: center;
  padding: 12px 8px 0;
  font-size: 16px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#00c108";
      case "dark":
      case "dark-jetbrains":
        return "#67d28b";
    }
  }};
`;

export const CircleLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  text-align: center;
`;
