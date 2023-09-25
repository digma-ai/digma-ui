import styled from "styled-components";
import { Button } from "../common/Button";
import { Link } from "../common/Link";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  padding: 8px;
`;

export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HeaderTitle = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const HeaderSubtitle = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const CloseButton = styled.button`
  margin-left: auto;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  height: 14px;
`;

export const StepsContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

export const FinishStepFooterContent = styled.div<{
  transitionClassName: string;
  transitionDuration: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  gap: 8px;

  ${({ transitionClassName, transitionDuration }) => {
    return `
      &.${transitionClassName}-enter {
        opacity: 0;
      }
      
      &.${transitionClassName}-enter-active {
        opacity: 1;
        transition: opacity ${transitionDuration}ms ease-out;
      }

      &.${transitionClassName}-exit {
        opacity: 1;
      }
      
      &.${transitionClassName}-exit-active {
        opacity: 0;
        transition: opacity ${transitionDuration}ms ease-out;
      }
      `;
  }}
`;

export const FooterSlackLink = styled(Link)`
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SectionDescription = styled.span`
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const IllustrationContainer = styled.div`
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#dfe6f0";
      case "dark":
      case "dark-jetbrains":
        return "#313131";
    }
  }};
`;

export const BackToInstallMethodButton = styled(Button)`
  width: 100%;
  padding: 6px 12px;
  height: initial;
  font-size: 16px;
`;

export const MainButton = styled(Button)`
  width: 100%;
  padding: 6px 12px;
  background: #3538cd;
  height: initial;
  font-size: 16px;
`;

// export const WelcomeContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px 16px;
//   margin-bottom: auto;
// `;

// export const WelcomeTitleContainer = styled.div`
//   display: flex;
//   gap: 4px;
//   align-items: center;
// `;

// export const WelcomeIconContainer = styled.div`
//   height: 40px;
// `;

// export const WelcomeTitle = styled.span`
//   font-weight: 500;
//   font-size: 16px;
//   color: ${({ theme }) => {
//     switch (theme.mode) {
//       case "light":
//         return "#4d668a";
//       case "dark":
//       case "dark-jetbrains":
//         return "#fff";
//     }
//   }};
// `;

// export const WelcomeText = styled.span`
//   font-size: 14px;
//   text-align: center;
//   letter-spacing: -0.1px;
//   padding: 20px 0;
//   color: ${({ theme }) => {
//     switch (theme.mode) {
//       case "light":
//         return "#828797";
//       case "dark":
//       case "dark-jetbrains":
//         return "#9b9b9b";
//     }
//   }};
// `;

// export const InstallationTypeText = styled.span`
//   font-size: 14px;
//   padding-bottom: 4px;
//   color: ${({ theme }) => {
//     switch (theme.mode) {
//       case "light":
//         return "#828797";
//       case "dark":
//       case "dark-jetbrains":
//         return "#9b9b9b";
//     }
//   }};
// `;

// export const InstallationTypeButtonsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// export const Badge = styled.span`
//   color: #fff;
//   font-weight: 400;
//   border-radius: 4px;
//   padding: 2px 4px;
//   text-align: center;
//   background: ${({ theme }) => {
//     switch (theme.mode) {
//       case "light":
//         return "#7891d0";
//       case "dark":
//       case "dark-jetbrains":
//         return "#4b5fab";
//     }
//   }};
// `;

// export const SubscriptionContentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// export const SubscriptionSuccessMessage = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   font-size: 14px;
//   font-weight: 700;
//   margin-bottom: 43px;
//   color: ${({ theme }) => {
//     switch (theme.mode) {
//       case "light":
//         return "#1dc693";
//       case "dark":
//       case "dark-jetbrains":
//         return "#67d28b";
//     }
//   }};
// `;
