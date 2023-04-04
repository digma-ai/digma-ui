import styled from "styled-components";

export const Container = styled.div`
  background: #383838;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  background: #2e2e2e;
  padding: 8px;
`;

export const HeaderTitle = styled.span`
  padding-right: 8px;
`;

export const HeaderSubtitle = styled.span`
  padding-left: 8px;
  color: #9b9b9b;
  border-left: 1px solid #7c7c94;
`;

export const Link = styled.a`
  font-size: 12px;
  line-height: 14px;
  color: #b9c2eb;
  text-decoration: underline;
  cursor: pointer;
`;

export const SkipLink = styled(Link)`
  padding: 2px 4px;
  margin-left: auto;
  font-weight: 400;
`;

export const StepHeader = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 8px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  border-top: 1px solid #49494d;
`;

export const InactiveStepHeader = styled(StepHeader)`
  color: #9b9b9b;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.div`
  background: #3d3f41;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
  padding: 12px;
`;

export const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #6a6dfa;
  border-radius: 50%;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  color: #fff;
  flex-shrink: 0;
`;

export const NextStepNumber = styled(StepNumber)`
  color: #383838;
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const SectionTitle = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  color: #ededed;
  align-items: center;
  text-transform: capitalize;
`;

export const SectionIconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;

export const SectionDescription = styled.span`
  font-size: 12px;
  color: #9b9b9b;
`;

export const StepFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const IllustrationContainer = styled.div`
  height: 123px;
  width: 312px;
  background: #393739;
  border-radius 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
