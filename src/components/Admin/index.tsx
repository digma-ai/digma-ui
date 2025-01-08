import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import * as s from "./styles";

export const Admin = () => (
  <s.Container>
    <Helmet>
      <title>Digma admin panel</title>
      <meta name={"viewport"} content={"width=device-width"} />
    </Helmet>
    <Sidebar />
    <s.ContentContainer>
      <Header />
      <s.MainContainer>
        <Outlet />
      </s.MainContainer>
    </s.ContentContainer>
  </s.Container>
);
