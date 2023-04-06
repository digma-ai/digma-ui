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

export const Footer = styled.div`
  background: #3d3f41;
  display: flex;
  flex-grow: 1;
  padding: 12px;
`;

// postcss-styled-components-disable-next-line
export const FooterContent = styled.div<{
  transitionClassName: string;
  transitionDuration: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;

  ${({ transitionClassName, transitionDuration }) => {
    return `
      &.${transitionClassName}-enter {
        opacity: 0;
      }
      
      &.${transitionClassName}-enter-active {
        opacity: 1;
        transition: opacity ${transitionDuration}ms ease-out;
      }
      `;
  }};
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

export const IllustrationContainer = styled.div`
  height: 123px;
  width: 312px;
  background: #313131;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
