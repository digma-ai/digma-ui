import styled from "styled-components";
import { getCodeFont } from "../common/App/styles";

export const Container = styled.div`
  background: #5a5a5a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const PreviousStepHeader = styled.div`
  display: flex;
  gap: 8px;
  padding: 9px;
  color: #919191;
  background: #6a6a6a;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
`;

export const StepShortTitle = styled.span`
  margin-left: auto;
  text-transform: none;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  // TODO: check font
  /* font-family: "Nunito"; */
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  background: #6a6a6a;
  padding: 7px 0 5px;
`;

export const Content = styled.div`
  padding: 10px 16px 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StepCounter = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #919191;
  text-transform: uppercase;
`;

export const StepTitle = styled.span`
  display: flex;
  // TODO: check font
  /* font-family: "Nunito"; */
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  margin: 4px 0 18px;
  color: #fff;
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const SectionTitle = styled.span`
  // TODO: check font
  /* font-family: "Nunito"; */
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 2px;
  color: #ededed;
`;

export const SectionDivider = styled.span`
  // TODO: check font
  /* font-family: "Nunito"; */
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin: 20px 0;
  color: #ededed;
`;

export const SectionDescription = styled.span`
  // TODO: check font
  /* font-family: "Nunito"; */
  font-size: 10px;
  line-height: 14px;
  color: #cdcdcd;
  margin-bottom: 6px;
`;

export const CodeSnippetContainer = styled.div<{ disabled: boolean }>`
  background: #0c0b0b;
  padding: 8px 12px;
  border-radius: 2px;
  margin: 8px 0 12px;
  display: flex;
  gap: 27px;
  align-items: flex-start;
  justify-content: space-between;

  ${({ disabled }) => (disabled ? "opacity: 0.5;" : "")}
`;

export const Code = styled.code`
  ${({ theme }) => getCodeFont(theme.codeFont)}
  font-weight: 500;
  font-size: 9px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #dadada;
  white-space: pre;
`;

export const CopyButton = styled.button`
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const LoaderContainer = styled.div`
  margin-top: 23;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  gap: 8px;
`;

export const Link = styled.a`
  font-size: 10px;
  line-height: 12px;
  color: #dadada;
  text-decoration: underline;
  cursor: pointer;
`;

// export const SectionNumber = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 17px;
//   height: 17px;
//   background: #5154ec;
//   border-radius: 50%;
//   TODO: check font
/* font-family: "Mulish"; */
//   font-size: 12px;
//   line-height: 15px;
//   color: #fff;
//   margin: 15px 0 13px;
// `;

export const Illustration = styled.img`
  margin: 12px 0;
  max-width: 500px;
`;
