import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  background-color: #0f0f0f;
`;

export const Header = styled.div`
  margin: 8px 0;
  padding-left: 12px;
  line-height: 16px;
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  color: #49494d;
`;

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 18px;
  background: #1e1e1e;
  border-radius: 12px;
`;

// const rotateAnimation = keyframes`
//   15% { transform: rotateY(-30deg); }
//   45% { transform: rotateY(30deg); }
//   60% { transform: rotateY(0); }
// `;

// export const LogoRotationContainer = styled.div`
//   perspective: 100px;
// `;

// export const LogoContainer = styled.div`
//   animation: ${rotateAnimation} 6s linear infinite;
// `;

export const NoDataTitle = styled.span`
  font-family: "Nunito";
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  color: #b9c2eb;
  margin-top: 4px;
`;

export const NoDataText = styled.span`
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: #7c7c94;
  margin-top: 4px;
`;

export const DocumentationLink = styled.a`
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: #7891d0;
  text-decoration: none;
`;
