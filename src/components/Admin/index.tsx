import { Helmet } from "react-helmet";
import { Header } from "./Header";
import { Home } from "./Home";
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
      <main>
        {/* // TODO: replace with dynamic content */}
        <Home />
      </main>
    </s.ContentContainer>
  </s.Container>
);
