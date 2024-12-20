import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  getEnvironments,
  type GetEnvironmentsResponse
} from "../../api/web/services/environments";
import { logger } from "../../logging";
import * as s from "./styles";

export const Admin = () => {
  const [environments, setEnvironments] = useState<GetEnvironmentsResponse>([]);

  useEffect(() => {
    getEnvironments()
      .then((data) => {
        setEnvironments(data);
      })
      .catch((error) => {
        logger.error(error);
      });
  }, []);

  return (
    <s.Container>
      <Helmet>
        <title>Digma admin panel</title>
        <meta name={"viewport"} content={"width=device-width"} />
      </Helmet>
      <s.ContentContainer>
        <h1>Digma admin panel</h1>
        <div>Environments:</div>
        {environments.map((environment) => (
          <div key={environment.id}>{environment.name}</div>
        ))}
      </s.ContentContainer>
    </s.Container>
  );
};
